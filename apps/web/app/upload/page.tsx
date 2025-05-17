import { PDFUploader } from "../components/PDFUploader";

export default function UploadPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Upload Your PDF
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Upload your document and we'll generate an intelligent learning
            experience for you
          </p>
        </div>
        <PDFUploader />
      </div>
    </div>
  );
}
