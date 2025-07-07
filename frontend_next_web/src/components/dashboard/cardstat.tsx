"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  FileTextIcon,
  NotePencilIcon,
  CheckCircleIcon,
  WarningCircleIcon,
} from "@phosphor-icons/react";
import { motion, useMotionValue, useSpring, animate } from "framer-motion";

// CountUp component
function CountUp({ value, duration = 1.2 }: { value: number; duration?: number }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);

  useEffect(() => {
    const controls = animate(motionValue, value, {
      duration,
      ease: "easeOut",
      onUpdate: (latest) => {
        if (nodeRef.current) {
          nodeRef.current.textContent = Math.floor(latest).toLocaleString("id-ID");
        }
      },
    });
    return () => controls.stop();
  }, [value, duration, motionValue]);

  return <span ref={nodeRef}>{0}</span>;
}

// Card 3D logic dengan scale spring
function Card3DFloat({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHover, setIsHover] = useState(false);

  // Motion values for tilt & scale
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scale = useSpring(1, { stiffness: 260, damping: 24 }); // smooth scale spring

  // Tilt spring
  const rotateX = useSpring(y, { stiffness: 300, damping: 30 });
  const rotateY = useSpring(x, { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const card = ref.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const cardX = (e.clientX - rect.left) / rect.width;
    const cardY = (e.clientY - rect.top) / rect.height;
    const rotateYval = (cardX - 0.5) * 32; // kiri-kanan
    const rotateXval = -(cardY - 0.5) * 32; // atas-bawah
    x.set(rotateYval);
    y.set(rotateXval);
  };

  const handleMouseEnter = () => {
    setIsHover(true);
    scale.set(1.07); // scale up
  };

  const handleMouseLeave = () => {
    setIsHover(false);
    x.set(0);
    y.set(0);
    scale.set(1); // scale normal
  };

  return (
    <motion.div
      ref={ref}
      style={{
        perspective: 900,
        transformStyle: "preserve-3d",
      }}
      className="rounded-xl"
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          scale,
          boxShadow: isHover
            ? "0 12px 32px 0 rgba(59,130,246,0.22)"
            : "0 2px 12px 0 rgba(59,130,246,0.08)",
          background: isHover
            ? "linear-gradient(105deg, #dbeafe 0%, #60a5fa 100%)"
            : "white",
          transition: "background 0.3s",
        }}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileTap={{ scale: 0.98, boxShadow: "0 24px 48px 0 rgba(59,130,246,0.24)" }}
        className="rounded-xl transition-all duration-300 cursor-pointer select-none"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export default function DashboardStatSection({
  empatAnalisis,
}: {
  empatAnalisis?: {
    jumlah_laporan_terkini?: number;
    total_rekomendasi_terkini?: number;
    total_rekomendasi_tervalidasi?: number;
    total_rekomendasi_butuh_validasi?: number;
  };
}) {
  const statCards = [
    {
      description: "Jumlah Laporan Terkini",
      value: empatAnalisis?.jumlah_laporan_terkini ?? 0,
      icon: <FileTextIcon size={24} weight="duotone" />,
    },
    {
      description: "Rekomendasi Terkini",
      value: empatAnalisis?.total_rekomendasi_terkini ?? 0,
      icon: <NotePencilIcon size={24} weight="duotone" />,
    },
    {
      description: "Rekomendasi Tervalidasi",
      value: empatAnalisis?.total_rekomendasi_tervalidasi ?? 0,
      icon: <CheckCircleIcon size={24} weight="duotone" />,
    },
    {
      description: "Butuh Validasi",
      value: empatAnalisis?.total_rekomendasi_butuh_validasi ?? 0,
      icon: <WarningCircleIcon size={24} weight="duotone" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {statCards.map((card) => (
        <Card3DFloat key={card.description}>
          <Card className="bg-white/80 border border-blue-100 shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 transition-colors">
            <CardHeader>
              <div className="mb-2 flex items-center justify-start">
                <div className="rounded-full bg-blue-100 text-blue-500 dark:bg-blue-900 dark:text-blue-300 w-10 h-10 flex items-center justify-center shadow">
                  {card.icon}
                </div>
              </div>
              <CardDescription className="text-sm font-medium dark:text-blue-200">
                {card.description}
              </CardDescription>
              <CardTitle className="text-2xl font-bold tabular-nums @[250px]/card:text-3xl dark:text-white">
                <CountUp value={card.value} />
              </CardTitle>
            </CardHeader>
          </Card>
        </Card3DFloat>
      ))}
    </div>
  );
}
