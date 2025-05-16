import Link from 'next/link';

interface BreadcrumbProps {
  collection: string;
  page: string;
}

export default function Breadcrumb({ collection, page }: BreadcrumbProps) {
  return (
    <div className="text-sm text-gray-600 mb-4">
      <Link href="/" className="hover:text-blue-500">Home</Link>
      <span className="mx-2">/</span>
      <Link href={`/collection/${collection}`} className="hover:text-blue-500">{collection}</Link>
      <span className="mx-2">/</span>
      <span className="text-gray-900">{page}</span>
    </div>
  );
}
