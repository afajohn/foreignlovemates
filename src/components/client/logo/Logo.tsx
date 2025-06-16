import Image from 'next/image';

interface LogoProps {
  src: string; // Path to the logo image
  alt: string; // Alternative text for accessibility
  width?: number; // Optional width of the logo
  height?: number; // Optional height of the logo
  loading?: "eager" | "lazy";
}

const Logo: React.FC<LogoProps> = ({ src, alt, width = 100, height = 100, loading }) => {
  return (
      <Image 
        className='w-auto h-auto'
        src={src} 
        alt={alt} 
        width={width} 
        height={height} 
        loading={loading}
        // priority={true} // Ensures the logo loads quickly
      />
  );
};

export default Logo;