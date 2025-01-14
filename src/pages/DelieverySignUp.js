import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCamera, FaUser, FaEnvelope, FaPhone, FaLock, FaMapMarkerAlt, FaIdCard, FaMotorcycle, FaCheckCircle } from 'react-icons/fa';
import loginIcons from '../assest/signin.gif';
import imageTobase64 from '../helpers/imageTobase64';
import SummaryApi from '../common';
import Loader from '../components/loader/loader';

const DelieverySignUp = () => {
    const navigate = useNavigate();
    const [profilePic, setProfilePic] = useState(loginIcons);
    const [step, setStep] = useState(1);
    const [previewImage, setPreviewImage] = useState(null);
    const [documentImage, setDocumentImage] = useState(null);
    const [vehicleImage, setVehicleImage] = useState(null);
    const [formProgress, setFormProgress] = useState(0);

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors, isSubmitting, dirtyFields },
    } = useForm({
        mode: 'onChange'
    });

    // Calculate form progress
    React.useEffect(() => {
        const totalFields = 8; // Total number of required fields
        const filledFields = Object.keys(dirtyFields).length;
        setFormProgress((filledFields / totalFields) * 100);
    }, [dirtyFields]);

    const handleUploadPic = async (e, type) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            const imagePic = await imageTobase64(file);
            switch(type) {
                case 'profile':
                    setProfilePic(imagePic);
                    setPreviewImage(URL.createObjectURL(file));
                    break;
                case 'document':
                    setDocumentImage(imagePic);
                    break;
                case 'vehicle':
                    setVehicleImage(imagePic);
                    break;
                default:
                    break;
            }
            toast.success('Image uploaded successfully!');
        } catch (error) {
            toast.error('Error uploading image. Please try again.');
        }
    };

    const onSubmit = async (data) => {
        try {
            if (step < 3) {
                setStep(step + 1);
                return;
            }

            const formData = {
                ...data,
                role: 3,
                profile_pic: profilePic,
                document_image: documentImage,
                vehicle_image: vehicleImage
            };

            const response = await fetch(SummaryApi.signUP.url, {
                method: SummaryApi.signUP.method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (result.status) {
                toast.success('Registration successful! Redirecting to login...');
                reset();
                setTimeout(() => navigate('/login'), 2000);
            } else {
                toast.error(result.message || 'Registration failed. Please try again.');
            }
        } catch (error) {
            toast.error('An error occurred. Please try again later.');
        }
    };

    const renderStepIndicator = () => (
        <div className="flex justify-center mb-8">
            {[1, 2, 3].map((num) => (
                <div key={num} className="flex items-center">
                    <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            step >= num ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'
                        }`}
                    >
                        {step > num ? <FaCheckCircle /> : num}
                    </div>
                    {num < 3 && (
                        <div
                            className={`w-12 h-1 mx-2 ${
                                step > num ? 'bg-green-500' : 'bg-gray-200'
                            }`}
                        />
                    )}
                </div>
            ))}
        </div>
    );

    const renderStep1 = () => (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
        >
            <h2 className="text-xl font-semibold mb-6">Personal Information</h2>
            <div className="space-y-4">
                <div className="relative">
                    <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="First Name"
                        {...register('first_name', { required: 'First Name is required.' })}
                        className={`pl-10 bg-gray-100 p-3 rounded-lg w-full text-gray-700 outline-none focus:ring-2 focus:ring-green-500 transition ${
                            errors.first_name ? 'ring-2 ring-red-500' : ''
                        }`}
                    />
                    {errors.first_name && (
                        <p className="text-red-500 text-xs mt-1">{errors.first_name.message}</p>
                    )}
                </div>

                <div className="relative">
                    <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Last Name"
                        {...register('last_name', { required: 'Last Name is required.' })}
                        className={`pl-10 bg-gray-100 p-3 rounded-lg w-full text-gray-700 outline-none focus:ring-2 focus:ring-green-500 transition ${
                            errors.last_name ? 'ring-2 ring-red-500' : ''
                        }`}
                    />
                    {errors.last_name && (
                        <p className="text-red-500 text-xs mt-1">{errors.last_name.message}</p>
                    )}
                </div>

                <div className="relative">
                    <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="email"
                        placeholder="Email"
                        {...register('email', {
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Invalid email address"
                            }
                        })}
                        className="pl-10 bg-gray-100 p-3 rounded-lg w-full text-gray-700 outline-none focus:ring-2 focus:ring-green-500 transition"
                    />
                    {errors.email && (
                        <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                    )}
                </div>

                <div className="relative">
                    <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="tel"
                        placeholder="Contact Number"
                        {...register('mobile', {
                            required: 'Contact Number is required.',
                            pattern: {
                                value: /^[0-9]{10}$/,
                                message: 'Enter a valid 10-digit contact number.',
                            },
                        })}
                        className={`pl-10 bg-gray-100 p-3 rounded-lg w-full text-gray-700 outline-none focus:ring-2 focus:ring-green-500 transition ${
                            errors.mobile ? 'ring-2 ring-red-500' : ''
                        }`}
                    />
                    {errors.mobile && (
                        <p className="text-red-500 text-xs mt-1">{errors.mobile.message}</p>
                    )}
                </div>
            </div>
        </motion.div>
    );

    const renderStep2 = () => (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
        >
            <h2 className="text-xl font-semibold mb-6">Address & Documents</h2>
            <div className="space-y-4">
                <div className="relative">
                    <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <textarea
                        placeholder="Full Address"
                        {...register('address', { required: 'Address is required.' })}
                        className={`pl-10 bg-gray-100 p-3 rounded-lg w-full text-gray-700 outline-none focus:ring-2 focus:ring-green-500 transition ${
                            errors.address ? 'ring-2 ring-red-500' : ''
                        }`}
                        rows="3"
                    />
                    {errors.address && (
                        <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">ID Proof</label>
                    <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-green-500 transition-colors">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleUploadPic(e, 'document')}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <FaIdCard className="mx-auto h-12 w-12 text-gray-400" />
                        <p className="mt-1 text-sm text-gray-500">Upload your ID proof</p>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Vehicle Document</label>
                    <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-green-500 transition-colors">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleUploadPic(e, 'vehicle')}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <FaMotorcycle className="mx-auto h-12 w-12 text-gray-400" />
                        <p className="mt-1 text-sm text-gray-500">Upload driving license</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );

    const renderStep3 = () => (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
        >
            <h2 className="text-xl font-semibold mb-6">Account Setup</h2>
            <div className="space-y-4">
                <div className="relative mx-auto w-32 h-32 mb-6">
                    <div className="w-full h-full rounded-full overflow-hidden shadow-lg">
                        <img
                            src={previewImage || profilePic}
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <label className="absolute bottom-0 right-0 bg-green-500 rounded-full p-2 cursor-pointer shadow-lg hover:bg-green-600 transition-colors">
                        <FaCamera className="text-white" />
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleUploadPic(e, 'profile')}
                            className="hidden"
                        />
                    </label>
                </div>

                <div className="relative">
                    <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="password"
                        placeholder="Password"
                        {...register('password', {
                            required: 'Password is required.',
                            minLength: {
                                value: 6,
                                message: 'Password must be at least 6 characters long.',
                            },
                            pattern: {
                                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
                                message: 'Password must contain at least one letter and one number',
                            },
                        })}
                        className={`pl-10 bg-gray-100 p-3 rounded-lg w-full text-gray-700 outline-none focus:ring-2 focus:ring-green-500 transition ${
                            errors.password ? 'ring-2 ring-red-500' : ''
                        }`}
                    />
                    {errors.password && (
                        <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
                    )}
                </div>

            </div>
        </motion.div>
    );

    return (
        <section className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 py-12 px-4">
            <div className="container mx-auto max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl shadow-xl overflow-hidden"
                >
                    <div className="p-8">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                Become a Delivery Partner
                            </h1>
                            <p className="text-gray-600">Join our growing delivery network</p>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
                            <motion.div
                                className="h-2 bg-green-500 rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${formProgress}%` }}
                                transition={{ duration: 0.5 }}
                            />
                        </div>

                        {/* Step Indicator */}
                        {renderStepIndicator()}

                        {/* Form */}
                        <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
                            <AnimatePresence mode="wait">
                                {step === 1 && renderStep1()}
                                {step === 2 && renderStep2()}
                                {step === 3 && renderStep3()}
                            </AnimatePresence>

                            <div className="mt-8 flex justify-between">
                                {step > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => setStep(step - 1)}
                                        className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                                    >
                                        Back
                                    </button>
                                )}
                                <button
                                    type="submit"
                                    className={`px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors ${
                                        isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                                    } ml-auto`}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <Loader />
                                    ) : step === 3 ? (
                                        'Complete Registration'
                                    ) : (
                                        'Next'
                                    )}
                                </button>
                            </div>
                        </form>

                        {/* Login Link */}
                        <p className="mt-8 text-center text-gray-600 text-sm">
                            Already have an account?{' '}
                            <Link
                                to="/login"
                                className="text-green-600 hover:text-green-700 font-medium hover:underline"
                            >
                                Login here
                            </Link>
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default DelieverySignUp;
