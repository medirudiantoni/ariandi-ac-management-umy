import React from 'react'
import { AirVent, ChartColumn, History, House, Locate, Plus, Settings, SidebarClose } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion';

type SidebarProps = {
    onClose: VoidFunction;
    isOpen: boolean;
}

const sidebarVariants = {
    initial: {
        x: '-100%',
    },
    animate: {
        x: 0,
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 30
        }
    },
    exit: {
        x: '-100%',
        transition: {
            type: "tween",
            duration: 0.1,
            ease: "easeOut"
        }
    }
};

const overlayVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
};

const Sidebar: React.FC<SidebarProps> = ({ onClose, isOpen }) => {
    return (
        <AnimatePresence mode='wait'>
            {isOpen && (
                <motion.div variants={overlayVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className='w-full h-screen top-0 left-0 absolute inset-0 bg-black/50 z-40'>
                    <motion.div 
                        variants={sidebarVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit" 
                        className="w-4/5 h-full bg-white flex flex-col">
                        <div className="w-full h-fit py-3 px-5 border-b-2 flex justify-between">
                            <button className='w-10 flex items-center justify-center aspect-square rounded-full hover:bg-slate-200'>
                                <AirVent />
                            </button>
                            <button onClick={onClose} className='w-10 flex items-center justify-center aspect-square rounded-full hover:bg-slate-200'>
                                <SidebarClose />
                            </button>
                        </div>
                        <div className="w-full flex-1 flex flex-col justify-between">
                            <div className="w-full p-3 flex flex-col gap-0">
                                <ButtonSidebar name='Beranda'>
                                    <House />
                                </ButtonSidebar>
                                <ButtonSidebar name='Lokasi'>
                                    <Locate />
                                </ButtonSidebar>
                                <ButtonSidebar name='Laporan'>
                                    <ChartColumn />
                                </ButtonSidebar>
                                <ButtonSidebar name='Riwayat'>
                                    <History />
                                </ButtonSidebar>
                                <ButtonSidebar name='Data baru'>
                                    <Plus />
                                </ButtonSidebar>
                            </div>
                            <div className="w-full p-3 pb-5 border-t-2">
                                <ButtonSidebar name='Pengaturan'>
                                    <Settings />
                                </ButtonSidebar>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
        // <div className='w-full h-screen bg-black/50 absolute top-0 left-0'>
        //     <PageWrapper>
        //         <div className="w-4/5 h-full bg-white flex flex-col">
        //             <div className="w-full h-fit py-3 px-5 border-b-2 flex justify-between">
        //                 <button className='w-10 flex items-center justify-center aspect-square rounded-full hover:bg-slate-200'>
        //                     <AirVent />
        //                 </button>
        //                 <button onClick={onClose} className='w-10 flex items-center justify-center aspect-square rounded-full hover:bg-slate-200'>
        //                     <SidebarClose />
        //                 </button>
        //             </div>
        //             <div className="w-full flex-1 flex flex-col justify-between">
        //                 <div className="w-full p-3 flex flex-col gap-0">
        //                     <ButtonSidebar name='Beranda'>
        //                         <House />
        //                     </ButtonSidebar>
        //                     <ButtonSidebar name='Lokasi'>
        //                         <Locate />
        //                     </ButtonSidebar>
        //                     <ButtonSidebar name='Laporan'>
        //                         <ChartColumn />
        //                     </ButtonSidebar>
        //                     <ButtonSidebar name='Riwayat'>
        //                         <History />
        //                     </ButtonSidebar>
        //                     <ButtonSidebar name='Data baru'>
        //                         <Plus />
        //                     </ButtonSidebar>
        //                 </div>
        //                 <div className="w-full p-3 pb-5 border-t-2">
        //                     <ButtonSidebar name='Pengaturan'>
        //                         <Settings />
        //                     </ButtonSidebar>
        //                 </div>
        //             </div>
        //         </div>
        //     </PageWrapper>
        // </div>
    )
};

type ButtonSidebarProps = {
    children: React.ReactElement;
    name?: string;
}
function ButtonSidebar({ children, name }: ButtonSidebarProps) {
    return (
        <button className="w-full flex gap-4 py-2 px-4 rounded-xl hover:bg-slate-200 font-medium text-lg items-center">
            {children}
            {name}
        </button>
    )
}

export default Sidebar