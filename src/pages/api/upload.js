import cloudinary from '../../../cloudinary/cloudinary'

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { image } = req.body;

        try {
            const uploadResponse = await cloudinary.uploader.upload(image, {
                upload_preset: 'next_cloudinary_upload',
            });

            res.status(200).json({ url: uploadResponse.secure_url });
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Failed to upload image', details: error.message });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
