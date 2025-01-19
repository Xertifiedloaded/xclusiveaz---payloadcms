import cloudinary from 'cloudinary';
import type { CollectionConfig } from 'payload';

interface CloudinaryUploadResult {
  public_id: string;
  secure_url: string;
}

// Cloudinary Adapter Factory
export const cloudinaryAdapter = () => ({
  name: 'cloudinary',
  // The method to initialize the adapter
  generateAdapter: ({ collection, prefix = '' }: { collection: CollectionConfig; prefix?: string }) => {
    const baseFolder = `media/${collection.slug}`;

    return {
      name: 'cloudinary',

      // Generate a public URL for a file
      generateURL: ({ filename }: { filename: string }) => {
        return `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/v1/${baseFolder}/${prefix}${filename}`;
      },

      // Handle file upload to Cloudinary
      handleUpload: async ({
        file,
        filename,
      }: {
        file: any;
        filename: string;
      }) => {
        try {
          const result = await new Promise<CloudinaryUploadResult>((resolve, reject) => {
            const uploadStream = cloudinary.v2.uploader.upload_stream(
              {
                public_id: `${prefix}${filename}`,
                folder: baseFolder,
              },
              (error, result) => {
                if (error) reject(error);
                else resolve(result as CloudinaryUploadResult);
              }
            );

            file.createReadStream().pipe(uploadStream);
          });

          return {
            filename: result.public_id,
            url: result.secure_url,
          };
        } catch (error) {
          console.error('Upload error:', error);
          throw error;
        }
      },

      // Handle file deletion from Cloudinary
      handleDelete: async ({ filename }: { filename: string }) => {
        try {
          await cloudinary.v2.uploader.destroy(`${baseFolder}/${prefix}${filename}`);
        } catch (error) {
          console.error('Delete error:', error);
          throw error;
        }
      },

      // No static handling needed for Cloudinary
      staticHandler: () => null,
    };
  },
});
