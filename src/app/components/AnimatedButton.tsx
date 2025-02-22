import Link from "next/link";



interface AnimatedButtonProps {
  label: string;
 
}

export default function AnimatedButton({ label }: AnimatedButtonProps) {
  return (
    
      <button className="glow-on-hover" type="button">
        {label}
      </button>
   
  );
}
