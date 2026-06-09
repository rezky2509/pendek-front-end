import type { NextConfig } from "next";
import withFlowbiteReact from "flowbite-react/plugin/nextjs";

const nextConfig: NextConfig = {
  /* config options here */
  // matcher: '/dashboard/:path*'
  // Allow CORS
  // allowedDevOrigins: ['192.168.0.140']
};

export default withFlowbiteReact(nextConfig);