import React, { useState } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { Plus, X, Trash2 } from 'lucide-react';
import ImageUploadPreview from '../ImageUploadPreview';
import apiClient from '../../api/apiClient';
import toast from 'react-hot-toast';

export default function CourseForm({ defaultValues, onSubmit, isSubmitting }) {
    const { register, control, handleSubmit, setValue, watch, formState: { errors } } = useForm({
        defaultValues: defaultValues || {
            title: '',
            slug: '',
            tagline: '',
            description: '',
            instructorName: '',
            fee: 0,
            duration: '',
            price: 0,
            isFeatured: false,
            isPopular: false,
            syllabus: [{ title: 'Module 1', lessons: [] }], // lessons as array of strings
            whatYouWillLearn: [],
            outcomes: [],
            prerequisites: [],
            faqs: [],
            image: '',
            instructorImage: ''
        }
    });

    const { fields: syllabusFields, append: appendSyllabus, remove: removeSyllabus } = useFieldArray({
        control,
        name: 'syllabus'
    });

    const [uploadingImage, setUploadingImage] = useState(false);
    const [uploadingInstructorImage, setUploadingInstructorImage] = useState(false);

    const handleImageUpload = async (file, type) => {
        const formData = new FormData();
        formData.append('image', file);

        const setUploading = type === 'course' ? setUploadingImage : setUploadingInstructorImage;
        setUploading(true);

        try {
            const response = await apiClient('/upload/image', {
                method: 'POST',
                body: formData
            });

            if (response.success) {
                const imageUrl = response.data.imageUrl;
                if (type === 'course') {
                    setValue('image', imageUrl);
                } else {
                    setValue('instructorImage', imageUrl);
                }
                toast.success('Image uploaded successfully');
            }
        } catch (error) {
            console.error('Upload failed:', error);
            toast.error('Failed to upload image');
        } finally {
            setUploading(false);
        }
    };

    const onLocalSubmit = async (data) => {
        // Transform lessons from string to array if needed (simplified handling)
        const transformedSyllabus = data.syllabus ? data.syllabus.map(mod => ({
            ...mod,
            lessons: typeof mod.lessons === 'string' ? mod.lessons.split(',').map(s => s.trim()) : mod.lessons
        })) : [];

        await onSubmit({
            ...data,
            syllabus: transformedSyllabus
        });
    };

    return (
        <form onSubmit={handleSubmit(onLocalSubmit)} className="space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Image Uploads */}
                <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Course Image</label>
                        <Controller
                            control={control}
                            name="image"
                            render={({ field: { value, onChange } }) => (
                                <ImageUploadPreview
                                    currentImage={value}
                                    onImageUpload={(file) => handleImageUpload(file, 'course')}
                                    onImageRemove={() => onChange('')}
                                    uploading={uploadingImage}
                                    showUploadButton={false}
                                />
                            )}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Instructor Image</label>
                        <Controller
                            control={control}
                            name="instructorImage"
                            render={({ field: { value, onChange } }) => (
                                <ImageUploadPreview
                                    currentImage={value}
                                    onImageUpload={(file) => handleImageUpload(file, 'instructor')}
                                    onImageRemove={() => onChange('')}
                                    uploading={uploadingInstructorImage}
                                    showUploadButton={false}
                                />
                            )}
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input {...register('title', { required: 'Title is required' })} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#26a8df]" />
                    {errors.title && <p className="text-red-500 text-xs">{errors.title.message}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Slug (URL)</label>
                    <input {...register('slug', { required: 'Slug is required' })} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#26a8df]" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tagline</label>
                    <input {...register('tagline')} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#26a8df]" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Instructor Name</label>
                    <input {...register('instructorName')} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#26a8df]" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                    <input {...register('duration')} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#26a8df]" placeholder="e.g. 3 Months" />
                </div>
                <div className="flex items-center gap-4 pt-6">
                    <label className="flex items-center gap-2">
                        <input type="checkbox" {...register('isFeatured')} className="w-4 h-4 text-[#26a8df] rounded" /> Featured
                    </label>
                    <label className="flex items-center gap-2">
                        <input type="checkbox" {...register('isPopular')} className="w-4 h-4 text-[#26a8df] rounded" /> Popular
                    </label>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea {...register('description')} rows={4} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#26a8df]" />
            </div>

            {/* Syllabus Section */}
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-gray-800">Syllabus</h3>
                    <button type="button" onClick={() => appendSyllabus({ title: '', lessons: '' })} className="text-sm bg-[#26a8df] text-white px-3 py-1 rounded-lg">
                        Add Module
                    </button>
                </div>

                <div className="space-y-4">
                    {syllabusFields.map((field, index) => (
                        <div key={field.id} className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
                            <div className="flex justify-between mb-2">
                                <input
                                    {...register(`syllabus.${index}.title`)}
                                    placeholder="Module Title"
                                    className="font-bold border-b border-gray-300 focus:outline-none focus:border-[#26a8df] w-full mr-4 mb-2"
                                />
                                <button type="button" onClick={() => removeSyllabus(index)} className="text-red-500 hover:bg-red-50 p-1 rounded h-8 w-8 flex items-center justify-center">
                                    <Trash2 size={16} />
                                </button>
                            </div>
                            <input
                                // Use text input for comma-separated lessons
                                {...register(`syllabus.${index}.lessons`)}
                                placeholder="Enter lessons separated by commas (e.g. Intro, Setup, First App)"
                                className="w-full text-sm p-2 bg-gray-50 rounded border border-gray-100 focus:outline-none focus:border-[#26a8df]"
                            />
                            <p className="text-xs text-gray-400 mt-1">Separate lessons with commas.</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
                <button type="button" className="px-4 py-2 border border-gray-300 rounded-lg">Cancel</button>
                <button
                    type="submit"
                    disabled={isSubmitting || uploadingImage || uploadingInstructorImage}
                    className="px-6 py-2 bg-[#26a8df] text-white rounded-lg font-bold hover:bg-[#1d8dbd] disabled:opacity-50"
                >
                    {isSubmitting ? 'Saving...' : 'Save Course'}
                </button>
            </div>
        </form>
    );
}
