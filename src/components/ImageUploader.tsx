import { useState, useRef, ChangeEvent } from 'react';
import { FormInputClasses, PressableClasses } from '../styles/UIClasses';
import ProfileImage from './ProfileImage';

type Props = {
    onImageSelected: (url: string) => void,
    initial?: string
}

const ImageUploader = ({ onImageSelected, initial = "P" }: Props) => {
    const [imageType, setImageType] = useState<'URL' | 'WEBCAM'>('URL');
    const [imagePreview, setImagePreview] = useState('https://placehold.co/600?text=' + initial);
    const [imageUri, setImageUri] = useState('');
    const [webcamError, setWebcamError] = useState('');
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [usingCamera, setUsingCamera] = useState(false)

    const handleUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
        const url = e.target.value;
        setImageUri(url);
        setImagePreview(url);
        onImageSelected?.(url);
    };

    const toggleWebcam = async () => {
        try {
            if (!videoRef.current) return

            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });

            if (usingCamera) {
                const tracks = stream.getTracks();
                tracks.forEach(track => track.stop());
                videoRef.current.srcObject = null;
                return
            }

            videoRef.current.srcObject = stream;
            setWebcamError('');

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (_) {
            setWebcamError('Unable to access webcam. Please check permissions.');
        } finally {
            setUsingCamera(!usingCamera)
        }
    };

    const captureImage = () => {
        if (videoRef.current && canvasRef.current) {
            const context = canvasRef.current.getContext('2d');
            if (context) {
                context.drawImage(videoRef.current, 0, 0, 300, 200);
                const imageDataUrl = canvasRef.current.toDataURL('image/jpeg');
                setImagePreview(imageDataUrl);
                setImageUri(imageDataUrl);
                onImageSelected(imageDataUrl);
                toggleWebcam()
            }
        }
    };

    return (
        <div className='flex flex-col items-center gap-4'>
            <div className='flex flex-col items-center gap-2'>
                {imagePreview && (
                    <ProfileImage
                        image={imagePreview}
                        username='U'
                        active={true}
                        size='Xlg'
                    />
                )}

                {imageType === 'WEBCAM' && 
                    <div >
                    {webcamError && (
                        <div>{webcamError}</div>
                    )}
                    <div className={!usingCamera ? 'hidden' : ''}>
                        <video
                            ref={videoRef}
                            autoPlay
                            width={300}
                            height={200}
                        />
                        <canvas
                            ref={canvasRef}
                            width={300}
                            height={200}
                            style={{ display: 'none' }}
                        />
                    </div>
                </div>
                }

                <div className='flex'>
                    <button type="button" className={`min-w-40 ${imageType === 'URL' && '!bg-slate-500'} ${PressableClasses} !rounded-r-none`} onClick={() => setImageType('URL')}>
                        Enter URL
                    </button>
                    <button type="button" className={`min-w-40 ${imageType === 'WEBCAM' && '!bg-slate-500'} ${PressableClasses} !rounded-l-none`} onClick={() => setImageType('WEBCAM')}>
                        Use Webcam
                    </button>
                </div>
            </div>

            {imageType === 'URL' && (
                <div className="flex flex-col w-full">
                    <label htmlFor="url" className="font-medium text-sm">Url</label>
                    <input
                        className={FormInputClasses + 'w-full'}
                        type="text"
                        value={imageUri}
                        onChange={handleUrlChange}
                    />
                </div>
            )}
            {imageType === 'WEBCAM' && (
                <div>
                    <button className={PressableClasses} type="button" onClick={toggleWebcam}>
                        {usingCamera ? 'Stop Camera' : 'Start Webcam'}
                    </button>
                    {usingCamera && (
                        <button className={PressableClasses} type="button" onClick={captureImage}>
                            Capture Image
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default ImageUploader;