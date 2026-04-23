

import Image from 'next/image'
import { FC, memo } from 'react'

interface adminTableImgPreviewProps {
    image?: string,
    title: string,
}

const AdminTableImgPreview: FC<adminTableImgPreviewProps> = memo(({ image, title }) => {
    return (
        <div className="flex items-center gap-4">
            {image && (
                <div className="relative h-12 w-20 overflow-hidden rounded-xl border-2 border-white disney-shadow bg-slate-100">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        sizes="80px"
                        className="object-cover"
                    />
                </div>
            )}
            <p className="font-bold text-slate-800">{title}</p>
        </div>
    )
})

export default AdminTableImgPreview
