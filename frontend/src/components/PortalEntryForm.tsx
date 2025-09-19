import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { uploadImageApi } from "../store/reducers/api/apiCall/uploadImage";
import {
  Calendar,
  MapPin,
  Tag,
  Upload,
  Image as ImageIcon,
  X,
  Loader,
} from "lucide-react";
import { toast } from "react-toastify";

// toast.success('🦄 Wow so easy!');

interface PortalEntryFormData {
  title: string;
  description: string;
  keywords: string[];
  listingType: "LOST" | "FOUND";
  landmark?: string;
  lostOrFoundAt?: Date;
  imageUrls: string[];
  fileIds: string[];
}

interface PortalEntryFormProps {
  onSubmit: (data: PortalEntryFormData) => void;
  isLoading?: boolean;
}

interface UploadedImage {
  fileId: string;
  imageUrl: string;
  uploadedAt: string;
  isUploading?: boolean;
  file?: File;
}

const PortalEntryForm: React.FC<PortalEntryFormProps> = ({
  onSubmit,
  isLoading = false,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<PortalEntryFormData>({
    defaultValues: {
      listingType: "LOST",
      keywords: [],
      imageUrls: [],
      fileIds: [],
    },
  });

  const [keywordInput, setKeywordInput] = useState("");
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [uploadingCount, setUploadingCount] = useState(0);

  const watchedListingType = watch("listingType");
  const watchedKeywords = watch("keywords");

  const handleAddKeyword = () => {
    if (keywordInput.trim() && !watchedKeywords.includes(keywordInput.trim())) {
      const newKeywords = [...watchedKeywords, keywordInput.trim()];
      setValue("keywords", newKeywords);
      setKeywordInput("");
    }
  };

  const handleRemoveKeyword = (index: number) => {
    const newKeywords = watchedKeywords.filter((_, i) => i !== index);
    setValue("keywords", newKeywords);
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    // Create temporary entries with loading state
    const tempImages: UploadedImage[] = Array.from(files).map(
      (file, index) => ({
        fileId: `temp_${Date.now()}_${index}`,
        imageUrl: URL.createObjectURL(file),
        uploadedAt: new Date().toISOString(),
        isUploading: true,
        file,
      })
    );

    // Add temporary images to state
    setUploadedImages((prev) => [...prev, ...tempImages]);
    setUploadingCount((prev) => prev + files.length);

    // Upload each file
    for (let i = 0; i < tempImages.length; i++) {
      const tempImage = tempImages[i];
      try {
        const uploadResult = await uploadImageApi(tempImage.file!);

        // Update the specific image with real data
        setUploadedImages((prev) =>
          prev.map((img) =>
            img.fileId === tempImage.fileId
              ? {
                  fileId: uploadResult.fileId,
                  imageUrl: uploadResult.imageUrl,
                  uploadedAt: uploadResult.uploadedAt,
                  isUploading: false,
                }
              : img
          )
        );

        // Update form values with successful uploads
        setUploadedImages((currentImages) => {
          const successfulUploads = currentImages.filter(
            (img) => !img.isUploading
          );
          setValue(
            "imageUrls",
            successfulUploads.map((img) => img.imageUrl)
          );
          setValue(
            "fileIds",
            successfulUploads.map((img) => img.fileId)
          );
          return currentImages;
        });

        // Show success toast for successful upload
        toast.success(`Image uploaded successfully: ${tempImage.file?.name}`);
      } catch (error) {
        console.error("Failed to upload image:", error);

        // Remove failed upload
        setUploadedImages((prev) =>
          prev.filter((img) => img.fileId !== tempImage.fileId)
        );

        // Show error toast instead of alert
        toast.error(`Failed to upload image: ${tempImage.file?.name}`);
      } finally {
        setUploadingCount((prev) => prev - 1);

        // Clean up object URL
        if (tempImage.imageUrl.startsWith("blob:")) {
          URL.revokeObjectURL(tempImage.imageUrl);
        }
      }
    }

    // Clear the file input
    event.target.value = "";
  };

  const handleRemoveImage = (fileId: string) => {
    const imageToRemove = uploadedImages.find((img) => img.fileId === fileId);

    // Clean up object URL if it's a temporary one
    if (imageToRemove?.imageUrl.startsWith("blob:")) {
      URL.revokeObjectURL(imageToRemove.imageUrl);
    }

    const newImages = uploadedImages.filter((img) => img.fileId !== fileId);
    setUploadedImages(newImages);

    // Update form values
    const successfulImages = newImages.filter((img) => !img.isUploading);
    setValue(
      "imageUrls",
      successfulImages.map((img) => img.imageUrl)
    );
    setValue(
      "fileIds",
      successfulImages.map((img) => img.fileId)
    );
  };

  const onFormSubmit = (data: PortalEntryFormData) => {
    // Only include successfully uploaded images
    const successfulImages = uploadedImages.filter((img) => !img.isUploading);
    const finalData = {
      ...data,
      imageUrls: successfulImages.map((img) => img.imageUrl),
      fileIds: successfulImages.map((img) => img.fileId),
    };

    console.log("Form Data:", finalData);
    onSubmit(finalData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Report an Item
            </h1>
            <p className="text-lg text-gray-600">
              Help us reunite lost items with their owners
            </p>
          </div>

          <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-8">
            {/* Listing Type */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-4">
                What are you reporting?
              </label>
              <div className="grid grid-cols-2 gap-4">
                <label className="cursor-pointer">
                  <input
                    type="radio"
                    value="LOST"
                    {...register("listingType", {
                      required: "Please select listing type",
                    })}
                    className="sr-only"
                  />
                  <div
                    className={`p-4 rounded-xl border-2 transition-all duration-200 text-center ${
                      watchedListingType === "LOST"
                        ? "border-sky-400 bg-sky-50 text-sky-700"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="font-semibold">Lost Item</div>
                    <div className="text-sm text-gray-600">
                      I lost something
                    </div>
                  </div>
                </label>
                <label className="cursor-pointer">
                  <input
                    type="radio"
                    value="FOUND"
                    {...register("listingType", {
                      required: "Please select listing type",
                    })}
                    className="sr-only"
                  />
                  <div
                    className={`p-4 rounded-xl border-2 transition-all duration-200 text-center ${
                      watchedListingType === "FOUND"
                        ? "border-green-500 bg-green-50 text-green-700"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="font-semibold">Found Item</div>
                    <div className="text-sm text-gray-600">
                      I found something
                    </div>
                  </div>
                </label>
              </div>
              {errors.listingType && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.listingType.message}
                </p>
              )}
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Item Title *
              </label>
              <input
                type="text"
                {...register("title", {
                  required: "Title is required",
                  minLength: { value: 1, message: "Enter a valid title" },
                })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-400 focus:border-transparent outline-none"
                placeholder="e.g., Black iPhone 14, Blue Backpack, etc."
              />
              {errors.title && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Description *
              </label>
              <textarea
                {...register("description", {
                  required: "Description is required",
                  minLength: { value: 1, message: "Enter a valid description" },
                })}
                rows={4}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-400 focus:border-transparent outline-none resize-none"
                placeholder="Provide detailed description including color, brand, distinctive features, etc."
              />
              {errors.description && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Keywords */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Keywords (Tags)
              </label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={keywordInput}
                  onChange={(e) => setKeywordInput(e.target.value)}
                  onKeyPress={(e) =>
                    e.key === "Enter" &&
                    (e.preventDefault(), handleAddKeyword())
                  }
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-400 focus:border-transparent outline-none"
                  placeholder="Add keywords (press Enter to add)"
                />
                <button
                  type="button"
                  onClick={handleAddKeyword}
                  className="px-6 py-3 bg-sky-400 text-white rounded-xl hover:bg-sky-500 transition-colors font-medium"
                >
                  <Tag className="w-4 h-4" />
                </button>
              </div>
              {watchedKeywords.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {watchedKeywords.map((keyword, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm"
                    >
                      {keyword}
                      <button
                        type="button"
                        onClick={() => handleRemoveKeyword(index)}
                        className="text-gray-500 hover:text-red-500"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                <MapPin className="w-4 h-4 inline mr-1" />
                Landmark/Location
              </label>
              <input
                type="text"
                {...register("landmark")}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-400 focus:border-transparent outline-none"
                placeholder="e.g., Near Library, Cafeteria, Main Gate, etc."
              />
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                <Calendar className="w-4 h-4 inline mr-1" />
                When did you {watchedListingType?.toLowerCase()} it?
              </label>
              <input
                type="datetime-local"
                {...register("lostOrFoundAt")}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-400 focus:border-transparent outline-none"
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                <ImageIcon className="w-4 h-4 inline mr-1" />
                Photos (Optional)
              </label>
              <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-gray-300 transition-colors">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                  disabled={uploadingCount > 0}
                />
                <label
                  htmlFor="image-upload"
                  className={`cursor-pointer ${
                    uploadingCount > 0 ? "opacity-50" : ""
                  }`}
                >
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">
                    {uploadingCount > 0
                      ? `Uploading ${uploadingCount} image(s)...`
                      : "Click to upload images"}
                  </p>
                  <p className="text-sm text-gray-500">
                    PNG, JPG up to 10MB each
                  </p>
                </label>
              </div>

              {uploadedImages.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                  {uploadedImages.map((image) => (
                    <div key={image.fileId} className="relative">
                      <div className="relative">
                        <img
                          src={image.imageUrl}
                          alt="Uploaded"
                          className={`w-full h-24 object-cover rounded-lg border ${
                            image.isUploading ? "opacity-50" : ""
                          }`}
                        />
                        {image.isUploading && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Loader className="w-6 h-6 text-sky-400 animate-spin" />
                          </div>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => handleRemoveImage(image.fileId)}
                        disabled={image.isUploading}
                        className={`absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors ${
                          image.isUploading
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }`}
                      >
                        <X className="w-3 h-3 mx-auto" />
                      </button>

                      {image.isUploading && (
                        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 rounded-b-lg text-center">
                          Uploading...
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {uploadingCount > 0 && (
                <div className="mt-2 text-sm text-sky-600 text-center">
                  Please wait while images are being uploaded to the cloud...
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={isLoading || uploadingCount > 0}
                className={`w-full py-4 rounded-xl font-semibold text-lg transition-colors ${
                  watchedListingType === "LOST"
                    ? "bg-sky-400 hover:bg-sky-500 text-white"
                    : "bg-green-500 hover:bg-green-600 text-white"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isLoading
                  ? "Submitting..."
                  : uploadingCount > 0
                  ? "Uploading Images..."
                  : `Report ${watchedListingType} Item`}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PortalEntryForm;
