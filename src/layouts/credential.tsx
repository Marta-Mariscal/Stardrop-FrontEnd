import { ThemeSwitch } from "@/components/theme-switch";

export default function CredentialLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative flex flex-col h-screen">
            <ThemeSwitch />
            <main className="container mx-auto max-w-7xl px-6 flex-grow pt-16">{children}</main>
            <footer className="w-full bg-purple-200 py-6 mt-10 border-t border-gray-300">
                <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between">
                    <span className="text-sm text-gray-600">
                        © {new Date().getFullYear()} <span className="font-bold text-purple-600">Stardrop</span>. All rights reserved.
                    </span>
                    <div className="flex space-x-4 mt-4 sm:mt-0">
                        <a href="https://liberating-diplodocus-a07.notion.site/STARDROP-1b4ec2d2f9b8804196f6f038ad7a0ea6?source=copy_link" className="text-sm text-gray-600 hover:text-purple-600 transition">
                            Doc User
                        </a>
                        <a href="https://www.linkedin.com/in/marta-mariscal-velazquez/" className="text-sm text-gray-600 hover:text-purple-600 transition">
                            Contact
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
