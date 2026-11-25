/**
 * NeuroSyn Interactive 3D Hero Scene - Cinematic Cog Fly-Through Engine
 * Powered by Three.js.
 * Features:
 * 1. Resting state: Split hero with interactive 3D gear transmission on right.
 * 2. Scroll interaction: Smooth camera fly-through plunging deep INSIDE the central cog bore,
 *    passing through interlocking planetary gears, transmission shafts, and the neural soma.
 * 3. Dynamic acceleration: Gears spool up to high speed and synaptic photon particles rush past.
 * 4. Cursor tracking & drag inspection in resting state.
 */

(function () {
  'use strict';

  function setup() {
    var track = document.getElementById('hero');
    var container = document.getElementById('hero-canvas-wrap');
    var canvas = document.getElementById('neural-hero-canvas');
    var overlay = document.getElementById('hero-content');
    var hint = document.getElementById('hero-scroll-hint');

    if (!container || !canvas) return;
    if (typeof THREE === 'undefined') {
      setTimeout(setup, 50);
      return;
    }

    var scene, camera, renderer;
    var mainGroup, gearGroup, innerGearGroup, coreGroup, particleGroup;
    var gears = [], planetGears = [], pulses = [], particles = [];
    var targetRotX = 0, targetRotY = 0, curRotX = 0, curRotY = 0;
    var isHovered = false, hoverBoost = 0;
    var isVisible = true;
    var scrollP = 0, targetScrollP = 0, prevScrollP = 0;

    var width = container.clientWidth || window.innerWidth;
    var height = container.clientHeight || window.innerHeight;

    var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* --------------------------------------------------------------------------
       1. Scene & Renderer Initialization
       -------------------------------------------------------------------------- */
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45, width / height, 0.08, 100);
    camera.position.set(0, 0, 10.5);

    renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;

    mainGroup = new THREE.Group();
    scene.add(mainGroup);

    gearGroup = new THREE.Group();
    mainGroup.add(gearGroup);

    innerGearGroup = new THREE.Group();
    mainGroup.add(innerGearGroup);

    coreGroup = new THREE.Group();
    mainGroup.add(coreGroup);

    particleGroup = new THREE.Group();
    mainGroup.add(particleGroup);

    /* --------------------------------------------------------------------------
       2. Studio Physical Lighting (Directional Key, Rim & Interior Core Light)
       -------------------------------------------------------------------------- */
    var ambientLight = new THREE.AmbientLight(0xDEE2E6, 1.1);
    scene.add(ambientLight);

    // Key directional light from upper right
    var keyLight = new THREE.DirectionalLight(0xFFFFFF, 2.2);
    keyLight.position.set(10, 14, 12);
    scene.add(keyLight);

    // Front directional light illuminating gear faces and bevels
    var frontLight = new THREE.DirectionalLight(0xF8F9FA, 1.5);
    frontLight.position.set(0, 3, 9);
    scene.add(frontLight);

    // Cyan titanium rim light from back-left
    var rimLight = new THREE.DirectionalLight(0x75D6D6, 2.6);
    rimLight.position.set(-12, -6, -5);
    scene.add(rimLight);

    // Bottom upward fill light
    var fillLight = new THREE.DirectionalLight(0xADB5BD, 0.9);
    fillLight.position.set(0, -10, 6);
    scene.add(fillLight);

    // Camera probe headlight (illuminates interior tunnel as camera plunges)
    var camLight = new THREE.PointLight(0xC7FAFA, 2.0, 16, 1.4);
    camera.add(camLight);
    scene.add(camera);

    // Interior bore light: illuminates inside the cog tunnel
    var boreLight = new THREE.PointLight(0x75D6D6, 3.6, 14, 1.2);
    boreLight.position.set(0, 0, -1.8);
    mainGroup.add(boreLight);

    /* --------------------------------------------------------------------------
       3. Shared Physical Materials
       -------------------------------------------------------------------------- */
    var matTitanium = new THREE.MeshStandardMaterial({
      color: 0xE2E8F0,
      metalness: 0.9,
      roughness: 0.22,
    });

    var matPolishedChrome = new THREE.MeshStandardMaterial({
      color: 0xF8FAFC,
      metalness: 0.98,
      roughness: 0.12,
    });

    var matDarkSteel = new THREE.MeshStandardMaterial({
      color: 0x475569,
      metalness: 0.88,
      roughness: 0.32,
    });

    var matGoldBronze = new THREE.MeshStandardMaterial({
      color: 0x94A3B8,
      metalness: 0.85,
      roughness: 0.26,
    });

    var matCyanPulse = new THREE.MeshBasicMaterial({
      color: 0x75D6D6,
      transparent: true,
      opacity: 0.95
    });

    var matCoreEmissive = new THREE.MeshStandardMaterial({
      color: 0x1E293B,
      emissive: 0x75D6D6,
      emissiveIntensity: 0.75,
      roughness: 0.2,
      metalness: 0.8
    });

    /* --------------------------------------------------------------------------
       4. Procedural Precision Gear Generator
       -------------------------------------------------------------------------- */
    function createGearGeometry(outerRadius, innerRadius, teeth, toothDepth, holeRadius, depth, bevel) {
      var shape = new THREE.Shape();
      var totalPoints = teeth * 4;
      var angleStep = (Math.PI * 2) / totalPoints;

      for (var i = 0; i < totalPoints; i++) {
        var angle = i * angleStep;
        var stage = i % 4;
        var r = (stage === 1 || stage === 2) ? outerRadius + toothDepth : outerRadius;
        var x = Math.cos(angle) * r;
        var y = Math.sin(angle) * r;
        if (i === 0) shape.moveTo(x, y);
        else shape.lineTo(x, y);
      }
      shape.closePath();

      // Center Bore Hole (allows camera to fly through)
      if (holeRadius > 0) {
        var hole = new THREE.Path();
        hole.absarc(0, 0, holeRadius, 0, Math.PI * 2, true);
        shape.holes.push(hole);
      }

      var extrudeSettings = {
        depth: depth || 0.32,
        bevelEnabled: bevel !== false,
        bevelSegments: 3,
        steps: 1,
        bevelSize: 0.045,
        bevelThickness: 0.045
      };

      var geom = new THREE.ExtrudeGeometry(shape, extrudeSettings);
      geom.computeVertexNormals();
      return geom;
    }

    /* --------------------------------------------------------------------------
       5. FRONT GEAR SYSTEM (Entryway for the Fly-Through)
       -------------------------------------------------------------------------- */
    // Main Crown Cog: Sized and proportioned for non-overlapping resting layout
    // and generous 1.10 bore radius for camera passage
    var geomMainGear = createGearGeometry(2.0, 1.55, 22, 0.28, 1.10, 0.36, true);
    var mainGearMesh = new THREE.Mesh(geomMainGear, matTitanium);
    mainGearMesh.position.set(0, 0, 1.0);
    gearGroup.add(mainGearMesh);
    gears.push({ mesh: mainGearMesh, speed: 0.42, axis: 'z' });

    // Inner bevel ring lining the main cog bore
    var geomBoreRing = new THREE.TorusGeometry(1.12, 0.06, 16, 64);
    var boreRingMesh = new THREE.Mesh(geomBoreRing, matPolishedChrome);
    boreRingMesh.position.set(0, 0, 1.18);
    gearGroup.add(boreRingMesh);

    // Satellite Gear 1 (Meshes top-right)
    var geomSat1 = createGearGeometry(0.95, 0.72, 14, 0.2, 0.35, 0.26, true);
    var sat1Mesh = new THREE.Mesh(geomSat1, matPolishedChrome);
    sat1Mesh.position.set(2.15, 1.55, 1.04);
    sat1Mesh.rotation.z = Math.PI / 14;
    gearGroup.add(sat1Mesh);
    gears.push({ mesh: sat1Mesh, speed: -0.66, axis: 'z' });

    // Satellite Gear 2 (Meshes bottom-left)
    var geomSat2 = createGearGeometry(1.1, 0.85, 16, 0.22, 0.4, 0.28, true);
    var sat2Mesh = new THREE.Mesh(geomSat2, matDarkSteel);
    sat2Mesh.position.set(-2.0, -1.4, 0.95);
    sat2Mesh.rotation.z = Math.PI / 16;
    gearGroup.add(sat2Mesh);
    gears.push({ mesh: sat2Mesh, speed: -0.58, axis: 'z' });

    // Orbital Small Pinion (side orbit)
    var geomSat3 = createGearGeometry(0.68, 0.46, 9, 0.16, 0.22, 0.2, true);
    var sat3Mesh = new THREE.Mesh(geomSat3, matGoldBronze);
    sat3Mesh.position.set(0.15, -2.15, 0.85);
    sat3Mesh.rotation.x = 0.25;
    gearGroup.add(sat3Mesh);
    gears.push({ mesh: sat3Mesh, speed: 0.95, axis: 'z' });

    /* --------------------------------------------------------------------------
       6. INTERIOR COG CHAMBER (Multi-Stage Transmission Tunnel: z = 0.5 to -2.8)
       -------------------------------------------------------------------------- */
    // Internal Ring Gear Housing (inverted teeth cylinder)
    var geomIntRing = createGearGeometry(1.65, 1.32, 18, -0.22, 1.25, 0.55, true);
    var intRingMesh = new THREE.Mesh(geomIntRing, matDarkSteel);
    intRingMesh.position.set(0, 0, -0.1);
    innerGearGroup.add(intRingMesh);
    gears.push({ mesh: intRingMesh, speed: -0.35, axis: 'z' });

    // Internal Gearbox Sleeve Rings (ribbed tunnel lining)
    for (var rz = 0.4; rz >= -3.6; rz -= 0.6) {
      var ribGeom = new THREE.TorusGeometry(1.24, 0.05, 12, 64);
      var ribMesh = new THREE.Mesh(ribGeom, matPolishedChrome);
      ribMesh.position.set(0, 0, rz);
      innerGearGroup.add(ribMesh);
    }

    // 3 Internal Planetary Gears inside the tunnel chamber (orbit around camera path)
    var planetGeom = createGearGeometry(0.46, 0.30, 8, 0.14, 0.14, 0.22, true);
    for (var pi = 0; pi < 3; pi++) {
      var pAngle = (pi / 3) * Math.PI * 2;
      var pDist = 0.98;
      var pMesh = new THREE.Mesh(planetGeom, matPolishedChrome);
      pMesh.position.set(Math.cos(pAngle) * pDist, Math.sin(pAngle) * pDist, -0.5);
      innerGearGroup.add(pMesh);
      planetGears.push({
        mesh: pMesh,
        angle: pAngle,
        dist: pDist,
        orbitSpeed: 0.32,
        spinSpeed: -1.35
      });
    }

    // Secondary Transmission Gear at z = -1.6 (Open bore for camera passage)
    var geomMidGear = createGearGeometry(1.65, 1.3, 18, 0.24, 1.12, 0.32, true);
    var midGearMesh = new THREE.Mesh(geomMidGear, matGoldBronze);
    midGearMesh.position.set(0, 0, -1.6);
    innerGearGroup.add(midGearMesh);
    gears.push({ mesh: midGearMesh, speed: -0.65, axis: 'z' });

    // Tertiary Turbine Ring Gear at z = -2.8 (High-density 26-tooth turbine)
    var geomTurbine = createGearGeometry(1.8, 1.45, 26, 0.22, 1.15, 0.3, true);
    var turbineMesh = new THREE.Mesh(geomTurbine, matTitanium);
    turbineMesh.position.set(0, 0, -2.8);
    innerGearGroup.add(turbineMesh);
    gears.push({ mesh: turbineMesh, speed: 0.85, axis: 'z' });

    /* --------------------------------------------------------------------------
       7. DEEP NEURAL LATTICE & SYNAPTIC CORE (Surrounds Tunnel at z = -3.4 to -5.0)
       -------------------------------------------------------------------------- */
    // Geodesic Neural Lattice (Cage surrounding the camera path, open in center)
    var cageGeom = new THREE.IcosahedronGeometry(1.7, 2);
    var cageMat = new THREE.MeshStandardMaterial({
      color: 0x75D6D6,
      wireframe: true,
      wireframeLinewidth: 2,
      emissive: 0x75D6D6,
      emissiveIntensity: 0.85
    });
    var cageMesh = new THREE.Mesh(cageGeom, cageMat);
    cageMesh.position.set(0, 0, -3.8);
    coreGroup.add(cageMesh);

    // Toroidal magnetic containment rings around the neural tunnel (centered at z = -3.8)
    var coreRing1 = new THREE.Mesh(new THREE.TorusGeometry(1.45, 0.045, 16, 64), matPolishedChrome);
    coreRing1.position.set(0, 0, -3.8);
    coreRing1.scale.set(1, 0.42, 1);
    coreGroup.add(coreRing1);

    var coreRing2 = new THREE.Mesh(new THREE.TorusGeometry(1.45, 0.045, 16, 64), matDarkSteel);
    coreRing2.position.set(0, 0, -3.8);
    coreRing2.scale.set(0.42, 1, 1);
    coreGroup.add(coreRing2);

    // Dendritic branches arching outward into deep 3D space
    var branchPaths = [
      [new THREE.Vector3(1.1, 1.1, -1.8), new THREE.Vector3(2.1, 2.0, -2.6), new THREE.Vector3(3.3, 2.7, -3.4), new THREE.Vector3(4.4, 3.2, -4.2)],
      [new THREE.Vector3(1.1, -1.0, -1.8), new THREE.Vector3(2.2, -1.8, -2.6), new THREE.Vector3(3.5, -2.4, -3.5), new THREE.Vector3(4.6, -2.8, -4.4)],
      [new THREE.Vector3(-1.1, 1.0, -1.8), new THREE.Vector3(-2.1, 1.9, -2.5), new THREE.Vector3(-3.3, 2.5, -3.4), new THREE.Vector3(-4.4, 2.9, -4.3)],
      [new THREE.Vector3(-1.1, -1.1, -1.8), new THREE.Vector3(-2.2, -1.9, -2.6), new THREE.Vector3(-3.4, -2.5, -3.5), new THREE.Vector3(-4.5, -3.0, -4.5)],
      [new THREE.Vector3(0.2, 1.3, -1.8), new THREE.Vector3(0.5, 2.6, -2.6), new THREE.Vector3(0.2, 3.8, -3.5), new THREE.Vector3(0.4, 4.6, -4.5)],
      [new THREE.Vector3(0.1, -1.3, -1.8), new THREE.Vector3(-0.4, -2.5, -2.6), new THREE.Vector3(-0.2, -3.7, -3.5), new THREE.Vector3(-0.3, -4.5, -4.5)]
    ];

    branchPaths.forEach(function (pts, bIndex) {
      var curve = new THREE.CatmullRomCurve3(pts);
      var tubeGeom = new THREE.TubeGeometry(curve, 32, 0.07, 10, false);
      var branchMesh = new THREE.Mesh(tubeGeom, matTitanium);
      coreGroup.add(branchMesh);

      // Terminal Synaptic Bouton
      var endPt = pts[pts.length - 1];
      var nodeMesh = new THREE.Mesh(new THREE.SphereGeometry(0.16, 16, 16), matPolishedChrome);
      nodeMesh.position.copy(endPt);
      coreGroup.add(nodeMesh);

      // Travelling cyan pulse
      var pulseMesh = new THREE.Mesh(new THREE.SphereGeometry(0.08, 12, 12), matCyanPulse);
      coreGroup.add(pulseMesh);
      pulses.push({
        mesh: pulseMesh,
        curve: curve,
        progress: (bIndex * 0.16) % 1,
        speed: 0.35 + Math.random() * 0.15
      });
    });

    /* --------------------------------------------------------------------------
       8. VOLUMETRIC SYNAPTIC SPEED PARTICLES (Warp Streaks during Dive)
       -------------------------------------------------------------------------- */
    // 140 photon particles distributed along the Z-axis tunnel
    var pGeom = new THREE.SphereGeometry(0.045, 8, 8);
    for (var i = 0; i < 140; i++) {
      var pMesh = new THREE.Mesh(pGeom, matCyanPulse);
      var theta = Math.random() * Math.PI * 2;
      var rad = 0.85 + Math.random() * 3.2; // distributed around the tunnel radius
      var pz = 4.5 - Math.random() * 12.0; // from front (4.5) to deep core (-7.5)
      pMesh.position.set(Math.cos(theta) * rad, Math.sin(theta) * rad, pz);
      particleGroup.add(pMesh);
      particles.push({
        mesh: pMesh,
        baseZ: pz,
        origRad: rad,
        theta: theta,
        speed: 0.5 + Math.random() * 1.5
      });
    }

    /* --------------------------------------------------------------------------
       9. Scroll Progress Tracker (Normalized 0.0 to 1.0)
       -------------------------------------------------------------------------- */
    var urlParams = new URLSearchParams(window.location.search);
    var forcedP = urlParams.has('p') ? parseFloat(urlParams.get('p')) : null;
    var scrollToTarget = urlParams.get('scrollto');

    if (scrollToTarget) {
      setTimeout(function () {
        var el = document.getElementById(scrollToTarget);
        if (el) {
          el.scrollIntoView({ behavior: 'instant', block: 'start' });
        }
      }, 30);
    }

    function updateScrollProgress() {
      if (forcedP !== null && !isNaN(forcedP)) {
        targetScrollP = forcedP;
        scrollP = forcedP;
        return;
      }
      if (!track) return;
      var rect = track.getBoundingClientRect();
      var trackHeight = track.offsetHeight - window.innerHeight;
      if (trackHeight <= 0) {
        targetScrollP = 0;
        return;
      }
      var scrolled = -rect.top;
      targetScrollP = Math.max(0, Math.min(1, scrolled / trackHeight));
    }

    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    updateScrollProgress();

    /* --------------------------------------------------------------------------
       10. Fixed Orientation & Cursor Proximity Lighting
       -------------------------------------------------------------------------- */
    var cogScreenPos = { x: window.innerWidth * 0.72, y: window.innerHeight * 0.5 };
    var cursorProximity = 0; // 0 (far) to 1 (close to cog)

    function updateCogScreenPos() {
      var w = window.innerWidth;
      var isMobile = w < 900;
      cogScreenPos.x = isMobile ? w * 0.5 : (w < 1280 ? w * 0.70 : w * 0.73);
      cogScreenPos.y = isMobile ? window.innerHeight * 0.58 : window.innerHeight * 0.50;
    }
    updateCogScreenPos();

    function onPointerMove(e) {
      // Delta from 3D cog center to mouse cursor on screen for subtle proximity illumination
      var deltaX = e.clientX - cogScreenPos.x;
      var deltaY = e.clientY - cogScreenPos.y;
      var dist = Math.hypot(deltaX, deltaY);
      var maxDist = Math.max(window.innerWidth, window.innerHeight);
      cursorProximity = Math.max(0, 1 - dist / (maxDist * 0.65));
      isHovered = cursorProximity > 0.45;
    }

    function onPointerLeave() {
      isHovered = false;
      cursorProximity = 0;
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('mouseleave', onPointerLeave);

    /* --------------------------------------------------------------------------
       11. Responsive Resize Handler
       -------------------------------------------------------------------------- */
    function onResize() {
      if (!container || !renderer || !camera) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      updateCogScreenPos();
      updateScrollProgress();
    }
    window.addEventListener('resize', onResize);

    // Pause rendering when offscreen
    if ('IntersectionObserver' in window && track) {
      var observer = new IntersectionObserver(function (entries) {
        isVisible = entries[0].isIntersecting;
      }, { threshold: 0.01 });
      observer.observe(track);
    }

    /* --------------------------------------------------------------------------
       12. Main 60 FPS Animation Loop (Smooth Cog Dive Engine)
       -------------------------------------------------------------------------- */
    var clock = new THREE.Clock();

    function animate() {
      requestAnimationFrame(animate);
      if (!isVisible) return;

      var delta = clock.getDelta();
      var elapsed = clock.getElapsedTime();

      // Smooth inertia lerp for scroll progress (or instant if forced via query param)
      if (forcedP !== null && !isNaN(forcedP)) {
        scrollP = forcedP;
      } else {
        scrollP += (targetScrollP - scrollP) * 0.09;
      }
      var pVelocity = Math.abs(scrollP - prevScrollP) / Math.max(delta, 0.001);
      prevScrollP = scrollP;

      hoverBoost += ((isHovered ? 1 : 0) * (0.6 + cursorProximity * 0.9) - hoverBoost) * 0.08;

      var w = window.innerWidth;
      var isMobile = w < 900;
      // Resting position in split layout: centered on right column
      var baseX = isMobile ? 0 : (w < 1280 ? 2.8 : 3.3);
      var baseY = isMobile ? -0.85 : 0.0;

      // ------------------------------------------------------------------------
      // A. CAMERA FLY-THROUGH INTO COG (Plunging down Z-axis)
      // ------------------------------------------------------------------------
      var camZ;
      if (scrollP <= 0.20) {
        // Phase 1: Approach & Align (10.5 -> 5.5)
        var t = scrollP / 0.20;
        camZ = 10.5 - t * 5.0;
      } else if (scrollP <= 0.45) {
        // Phase 2: Enter Front Cog Bore (5.5 -> 0.2)
        var t = (scrollP - 0.20) / 0.25;
        camZ = 5.5 - t * 5.3;
      } else if (scrollP <= 0.70) {
        // Phase 3: Fly through Planetary & Transmission Chamber (0.2 -> -2.2)
        var t = (scrollP - 0.45) / 0.25;
        camZ = 0.2 - t * 2.4;
      } else if (scrollP <= 0.88) {
        // Phase 4: Pass through Neural Soma & Synaptic Ring (-2.2 -> -4.2)
        var t = (scrollP - 0.70) / 0.18;
        camZ = -2.2 - t * 2.0;
      } else {
        // Phase 5: Breakthrough into deep graphite void (-4.2 -> -6.5)
        var t = (scrollP - 0.88) / 0.12;
        camZ = -4.2 - t * 2.3;
      }
      camera.position.z = camZ;

      // ------------------------------------------------------------------------
      // B. CENTERING THE COG FOR DIVE
      // ------------------------------------------------------------------------
      var centerRatio = Math.min(scrollP / 0.24, 1);
      var easeCenter = Math.sin(centerRatio * Math.PI / 2);
      mainGroup.position.x = baseX * (1 - easeCenter);
      mainGroup.position.y = baseY * (1 - easeCenter);

      // Symmetrical front-facing orientation:
      // Compensates for off-axis camera perspective so the cog faces directly in front at the viewer
      var lookInfrontAngleY = isMobile ? 0 : -Math.atan2(mainGroup.position.x, Math.max(camera.position.z, 2.0));
      mainGroup.rotation.set(0, lookInfrontAngleY, 0);

      // ------------------------------------------------------------------------
      // C. GEAR MECHANICS & ACCELERATION
      // ------------------------------------------------------------------------
      // Accelerate gear spin during the dive
      var diveBoost = 1.0;
      if (scrollP > 0.15 && scrollP < 0.88) {
        var divePhase = (scrollP - 0.15) / 0.73;
        diveBoost = 1.0 + Math.sin(divePhase * Math.PI) * 4.5 + Math.min(pVelocity * 1.5, 6.0);
      } else {
        diveBoost = 1.0 + hoverBoost * 1.2;
      }

      gears.forEach(function (g) {
        g.mesh.rotation[g.axis] += g.speed * delta * diveBoost;
      });

      // Planetary gears orbit + self-spin inside the chamber
      planetGears.forEach(function (pg) {
        pg.angle += pg.orbitSpeed * delta * diveBoost;
        pg.mesh.position.x = Math.cos(pg.angle) * pg.dist;
        pg.mesh.position.y = Math.sin(pg.angle) * pg.dist;
        pg.mesh.rotation.z += pg.spinSpeed * delta * diveBoost;
      });

      // ------------------------------------------------------------------------
      // D. SYNAPTIC IMPULSES & PHOTON SPEED PARTICLES
      // ------------------------------------------------------------------------
      pulses.forEach(function (p) {
        p.progress += p.speed * delta * diveBoost;
        if (p.progress > 1) p.progress = 0;
        var pt = p.curve.getPointAt(p.progress);
        p.mesh.position.copy(pt);
      });

      // Particle warp stretch: particles stretch along Z during the dive
      var stretchZ = 1 + Math.min(pVelocity * 2.5, 5.0) + (scrollP > 0.2 && scrollP < 0.85 ? 2.5 : 0);
      particles.forEach(function (pt) {
        pt.mesh.scale.set(1, 1, stretchZ);
        // Subtle orbital drift
        pt.theta += pt.speed * 0.1 * delta;
        pt.mesh.position.x = Math.cos(pt.theta) * pt.origRad;
        pt.mesh.position.y = Math.sin(pt.theta) * pt.origRad;
      });

      // ------------------------------------------------------------------------
      // E. OVERLAY TEXT & SCROLL HINT FADING (60 FPS DOM Scrub)
      // ------------------------------------------------------------------------
      if (overlay) {
        var textFade = Math.max(0, 1 - scrollP * 3.8);
        overlay.style.opacity = textFade.toFixed(3);
        overlay.style.transform = 'translate3d(' + (-scrollP * 70).toFixed(1) + 'px, 0, 0)';
        overlay.style.pointerEvents = textFade < 0.15 ? 'none' : 'auto';
      }

      if (hint) {
        var hintFade = Math.max(0, 1 - scrollP * 4.5);
        hint.style.opacity = hintFade.toFixed(3);
      }

      var backdrop = document.querySelector('.hero-3d-backdrop');
      if (backdrop) {
        var bgFade = Math.max(0, 1 - scrollP * 3.2);
        backdrop.style.opacity = bgFade.toFixed(3);
      }

      // Interior light pulse and cursor proximity glow
      boreLight.intensity = 2.4 + cursorProximity * 1.5 + Math.sin(elapsed * 4.0) * 0.8 + (scrollP > 0.3 && scrollP < 0.8 ? 2.0 : 0);

      renderer.render(scene, camera);
    }

    animate();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setup);
  } else {
    setup();
  }
})();
