'use client' // Indica que este componente se ejecuta en el cliente (navegador) y no en el servidor.

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet" // Importamos componentes de la interfaz de usuario para la navegación móvil.

import Image from "next/image" // Importamos el componente de Next.js para mostrar imágenes optimizadas.
import Link from "next/link" // Importamos el componente de Next.js para manejar enlaces sin recargar la página.
import { sidebarLinks } from "@/constants" // Importamos una lista de enlaces que se mostrarán en la barra lateral.
import { cn } from "@/lib/utils" // Importamos una función utilitaria que permite combinar clases CSS dinámicamente.
import { usePathname } from 'next/navigation' // Importamos un hook de Next.js para obtener la URL actual.
import { SheetClose } from "@/components/ui/sheet" // Componente que permite cerrar la hoja lateral cuando se hace clic en un enlace.

const MobileNav = ({ user }: MobileNavProps) => {
    const pathname = usePathname(); // Obtiene la ruta actual de la página para resaltar el enlace activo.

    return (
        <section className="w-full max-w-[264px]">
            {/* "Sheet" es un componente que muestra un menú lateral cuando se activa. */}
            <Sheet>
                {/* "SheetTrigger" es el botón que abre el menú lateral. Aquí usamos un icono de hamburguesa. */}
                <SheetTrigger>
                    <Image src="/icons/hamburger.svg" width={30} height={30} alt="menu" className="cursor-pointer" />
                </SheetTrigger>

                {/* "SheetContent" es el contenido del menú lateral. Aparece desde el lado izquierdo. */}
                <SheetContent side='left' className="border-none bg-white">
                    {/* Logo de la aplicación en la parte superior del menú */}
                    <Link href="/" className="cursor-pointer flex items-center gap-1 px-4">
                        <Image 
                            src="/icons/logo.svg"
                            width={34}
                            height={34}
                            alt="Horizon logo"
                        />
                        <h1 className='text-26 font-ibm-plex-serif font-bold text-black-1'>Horizon</h1>
                    </Link>

                    {/* Contenedor de los enlaces de navegación */}
                    <div className="mobilenav-sheet">
                        {/* "SheetClose" permite cerrar el menú cuando se hace clic en un enlace. */}
                        <SheetClose asChild>
                            <nav className="flex h-full flex-col gap-6 pt-16 text-white">
                                {/* Mapeamos la lista de enlaces de la barra lateral para mostrarlos en el menú */}
                                {sidebarLinks.map((item) => {
                                    const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`); // Verificamos si el enlace es el activo.

                                    return (
                                        <SheetClose asChild key={item.route}> 
                                            <Link href={item.route} className={cn('mobilenav-sheet_close w-full', {'bg-bank-gradient': isActive})}>
                                                {/* Icono del enlace */}
                                                <Image 
                                                    src={item.imgURL}
                                                    alt={item.label}
                                                    width={20}
                                                    height={20}
                                                    className={cn({
                                                        'brightness-[3] invert-0': isActive // Aplica estilos especiales si el enlace está activo.
                                                    })}
                                                />
                                                {/* Texto del enlace */}
                                                <p className={cn(
                                                    'text-16 font-semibold text-black-2', {'!text-white': isActive}
                                                )}>
                                                    {item.label} 
                                                </p>
                                            </Link>
                                        </SheetClose>
                                    );
                                })}
                                {/* Aquí se puede agregar más contenido, como información del usuario */}
                                USER
                            </nav>
                        </SheetClose>
                        {/* Sección para un pie de página dentro del menú */}
                        FOOTER
                    </div>
                </SheetContent>
            </Sheet>
        </section>
    );
}

export default MobileNav; // Exportamos el componente para poder usarlo en otras partes de la aplicación.
