import React from "react";
import { Link } from "react-router-dom";
import booksImage from "../assets/img/books.jpg";

// Import all location images
import location1 from "../assets/img/location/WhatsApp Image 2025-10-06 at 12.46.17.jpeg";
import location2 from "../assets/img/location/WhatsApp Image 2025-10-06 at 12.46.36 (1).jpeg";
import location3 from "../assets/img/location/WhatsApp Image 2025-10-06 at 12.46.36 (2).jpeg";
import location4 from "../assets/img/location/WhatsApp Image 2025-10-06 at 12.46.36.jpeg";
import location5 from "../assets/img/location/WhatsApp Image 2025-10-06 at 12.46.37 (1).jpeg";
import location6 from "../assets/img/location/WhatsApp Image 2025-10-06 at 12.46.37 (2).jpeg";
import location7 from "../assets/img/location/WhatsApp Image 2025-10-06 at 12.46.37 (3).jpeg";
import location8 from "../assets/img/location/WhatsApp Image 2025-10-06 at 12.46.37.jpeg";
import location9 from "../assets/img/location/WhatsApp Image 2025-10-06 at 12.46.38 (1).jpeg";
import location10 from "../assets/img/location/WhatsApp Image 2025-10-06 at 12.46.38.jpeg";

const Location = () => {
    const locationImages = [
        location1, location2, location3, location4, location5,
        location6, location7, location8, location9, location10
    ];

    return (
        <div className="">

            {/* Location Information */}
            <section className="py-12 bg-white/70">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">

                        {/* Map Section */}
                        <section className="py-12 bg-white/60">
                            <div className="container mx-auto px-4">
                                <div className="text-center mb-12">
                                    <h2 className="text-3xl font-semibold text-gray-800 mb-6">
                                        Dove Siamo
                                    </h2>
                                    <p className="text-xl text-gray-600">
                                        Vieni a trovarci nella nostra sede a Gemona del Friuli
                                    </p>
                                </div>

                                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                                    <div className="aspect-w-16 aspect-h-9">
                                        <iframe
                                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3005.6439921440243!2d13.079604076169044!3d46.06555097910945!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477a581430a70197%3A0x5c49b58051400749!2sVia%20della%20Cartiera%2C%2036%2C%2033080%20Gemona%20del%20Friuli%20UD!5e0!3m2!1sit!2sit!4v1733494243235!5m2!1sit!2sit"
                                            width="100%"
                                            height="450"
                                            style={{ border: 0 }}
                                            allowFullScreen=""
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"
                                            title="Mappa della sede"
                                        ></iframe>
                                    </div>
                                    <div className="p-8">
                                        <h3 className="text-2xl font-bold text-gray-800 mb-4">A LIFELONG LEARNING HUB</h3>
                                        <p className="text-gray-600 mb-4">
                                            Via della Cartiera 36, 33080 Gemona del Friuli (UD)
                                        </p>
                                        <p className="text-gray-600">
                                            Siamo facilmente raggiungibili con i mezzi pubblici e disponiamo di parcheggio gratuito per i nostri studenti.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Photo Gallery */}
                        <div className="mb-16 mt-6">
                            <h3 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
                                La nostra città
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {locationImages.map((image, index) => (
                                    <div key={index} className="group cursor-pointer">
                                        <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                                            <img
                                                src={image}
                                                alt={`Sede A LIFELONG LEARNING HUB - Foto ${index + 1}`}
                                                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                                                <i className="bi bi-zoom-in text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></i>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>


                        {/* Contact Info */}
                        <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-8 text-center">
                            <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                                Vuoi Visitare la Nostra Sede?
                            </h3>
                            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                                Siamo sempre felici di accogliere nuovi studenti e mostrare loro il nostro ambiente di apprendimento.
                                Contattaci per fissare una visita o per maggiori informazioni sui nostri corsi.
                            </p>
                            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                                <Link
                                    to="/contatti"
                                    className="bg-purple-600 text-white px-8 py-3 rounded-full font-medium hover:bg-purple-700 transition-colors"
                                >
                                    <i className="bi bi-envelope me-2"></i>
                                    Contattaci
                                </Link>
                                <a
                                    href="tel:+393402218595"
                                    className="bg-green-600 text-white px-8 py-3 rounded-full font-medium hover:bg-green-700 transition-colors"
                                >
                                    <i className="bi bi-telephone me-2"></i>
                                    Chiama Ora
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Location;
