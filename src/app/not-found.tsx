import Link from "next/link";
import Image from "next/image";
import notFoundImage from "@/assests/notFound.png";

const NotFound = () => {
  return (
    <div className="container mx-auto text-center py-24">
      <Image
        src={notFoundImage}
        alt="404 Not Found"
        className="mx-auto mb-8 w-1/2 h-auto"
        width={500}
        height={500} // Adjust width and height as per your image size
      />
      <h1 className="text-6xl font-bold mb-6">404</h1>
      <p className="text-2xl mb-8">
        Oops! The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link href="/" className="btn btn-green">
        Go back to Home
      </Link>
    </div>
  );
};

export default NotFound;
