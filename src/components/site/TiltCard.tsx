import { useRef, useState, useEffect, type ReactNode, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number; // degrees, default 3.5
  scale?: number; // scale on hover, default 1.015
  glare?: boolean;
  borderGlow?: boolean;
}

export function TiltCard({
  children,
  className = "",
  maxTilt = 3.5,
  scale = 1.015,
  glare = true,
  borderGlow = false,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [canHover, setCanHover] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const hasHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setCanHover(hasHover);
    setReducedMotion(prefersReduced);
  }, []);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Softer spring for more fluid, noticeable movement
  const mouseX = useSpring(x, { stiffness: 120, damping: 16, mass: 0.8 });
  const mouseY = useSpring(y, { stiffness: 120, damping: 16, mass: 0.8 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [maxTilt, -maxTilt]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-maxTilt, maxTilt]);

  // Specular glare position
  const glareX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);
  const glareGradient = useTransform(
    [glareX, glareY],
    ([gx, gy]) =>
      `radial-gradient(450px circle at ${gx} ${gy}, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.03) 40%, transparent 65%)`
  );

  // Dynamic shadow that shifts with tilt
  const shadowX = useTransform(mouseX, [-0.5, 0.5], [12, -12]);
  const shadowY = useTransform(mouseY, [-0.5, 0.5], [12, -12]);
  const dynamicShadow = useTransform(
    [shadowX, shadowY],
    ([sx, sy]) =>
      `${sx}px ${sy}px 30px -8px rgba(15, 23, 42, 0.1), 0 4px 12px -2px rgba(15, 23, 42, 0.04)`
  );

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !canHover || reducedMotion) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set(e.clientX / rect.width - rect.left / rect.width - 0.5);
    y.set(e.clientY / rect.height - rect.top / rect.height - 0.5);

    // More precise calculation
    const mouseFromLeft = e.clientX - rect.left;
    const mouseFromTop = e.clientY - rect.top;
    x.set(mouseFromLeft / rect.width - 0.5);
    y.set(mouseFromTop / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const disabled = !canHover || reducedMotion;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{
        rotateX: disabled ? 0 : rotateX,
        rotateY: disabled ? 0 : rotateY,
        transformStyle: "preserve-3d",
        perspective: 900,
        boxShadow: disabled ? undefined : dynamicShadow,
      }}
      whileHover={disabled ? undefined : { scale }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`relative ${className}`}
    >
      {/* Inner content with translateZ for depth pop */}
      <div style={{ transform: isHovered && !disabled ? "translateZ(8px)" : "translateZ(0)" }} className="transition-transform duration-500">
        {children}
      </div>

      {/* Specular glare overlay */}
      {glare && canHover && !reducedMotion && (
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-[inherit] z-10"
          style={{
            background: glareGradient,
            opacity: isHovered ? 1 : 0,
            transition: "opacity 0.4s ease",
          }}
        />
      )}

      {/* Subtle border glow on hover */}
      {borderGlow && canHover && !reducedMotion && (
        <motion.div
          className="pointer-events-none absolute -inset-[1px] rounded-[inherit] z-0"
          style={{
            background: "linear-gradient(135deg, rgba(6,182,212,0.15), transparent 40%, transparent 60%, rgba(6,182,212,0.1))",
            opacity: isHovered ? 1 : 0,
            transition: "opacity 0.5s ease",
          }}
        />
      )}
    </motion.div>
  );
}
