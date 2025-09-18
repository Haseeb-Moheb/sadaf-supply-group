import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgIf, DatePipe } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { trigger, state, style, transition, animate } from '@angular/animations';

interface Product {
  id: number;
  name: string;
  nameEs: string;
  description: string;
  descriptionEs: string;
  fullDescription: string;
  fullDescriptionEs: string;
  image: string;
  category: string;
  features: string[];
  featuresEs: string[];
}

interface Service {
  icon: string;
  title: string;
  titleEs: string;
  description: string;
  descriptionEs: string;
}

interface Testimonial {
  text: string;
  textEs: string;
  name: string;
  position: string;
  company: string;
  avatar: string;
}

interface CaseStudy {
  title: string;
  titleEs: string;
  summary: string;
  summaryEs: string;
  image: string;
  stats: Array<{value: string; label: string; labelEs: string}>;
}

interface BlogPost {
  title: string;
  titleEs: string;
  excerpt: string;
  excerptEs: string;
  image: string;
  category: string;
  date: Date;
  readTime: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgFor,
    NgIf,
    DatePipe
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('slideInUp', [
      state('in', style({transform: 'translateY(0)', opacity: 1})),
      transition('void => *', [
        style({transform: 'translateY(50px)', opacity: 0}),
        animate(300)
      ])
    ])
  ]
})
export class AppComponent implements OnInit {
  title = 'Sadaf Supply Group';
  currentLanguage = 'en';
  isMenuOpen = false;
  scrolled = false;
  
  // NAICS Code
  naicsCode = '424990'; // Other Miscellaneous Nondurable Goods Merchant Wholesalers

  // Product Catalog
  searchTerm = '';
  selectedCategory = '';
  selectedProduct: Product | null = null;

  products: Product[] = [
    {
      id: 1,
      name: 'Ergonomic Office Chair',
      nameEs: 'Silla de Oficina Ergonómica',
      description: 'High-quality adjustable office chair with lumbar support',
      descriptionEs: 'Silla de oficina ajustable de alta calidad con soporte lumbar',
      fullDescription: 'Premium ergonomic office chair designed for all-day comfort with adjustable height, tilt, and lumbar support.',
      fullDescriptionEs: 'Silla de oficina ergonómica premium diseñada para comodidad todo el día con altura, inclinación y soporte lumbar ajustables.',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400',
      category: 'office',
      features: ['Adjustable Height', '360° Swivel', 'Lumbar Support', '5-Year Warranty'],
      featuresEs: ['Altura Ajustable', 'Giro 360°', 'Soporte Lumbar', 'Garantía de 5 Años']
    },
    {
      id: 2,
      name: 'Industrial Safety Helmet',
      nameEs: 'Casco de Seguridad Industrial',
      description: 'ANSI-certified safety helmet for construction sites',
      descriptionEs: 'Casco de seguridad certificado ANSI para sitios de construcción',
      fullDescription: 'Heavy-duty safety helmet meeting all ANSI Z89.1 standards with comfortable suspension system.',
      fullDescriptionEs: 'Casco de seguridad resistente que cumple con todas las normas ANSI Z89.1 con sistema de suspensión cómodo.',
      image: 'https://images.unsplash.com/photo-1572636824274-fd7d9a45e5c1?w=400',
      category: 'safety',
      features: ['ANSI Certified', 'Impact Resistant', 'Adjustable Fit', 'UV Protection'],
      featuresEs: ['Certificado ANSI', 'Resistente al Impacto', 'Ajuste Ajustable', 'Protección UV']
    },
    {
      id: 3,
      name: 'Medical Ultrasound Machine',
      nameEs: 'Máquina de Ultrasonido Médico',
      description: 'Portable ultrasound system for healthcare facilities',
      descriptionEs: 'Sistema de ultrasonido portátil para instalaciones de salud',
      fullDescription: 'State-of-the-art portable ultrasound system with advanced imaging capabilities and user-friendly interface.',
      fullDescriptionEs: 'Sistema de ultrasonido portátil de última generación con capacidades de imagen avanzadas e interfaz fácil de usar.',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400',
      category: 'medical',
      features: ['High Resolution', 'Portable Design', 'Multiple Probes', 'Digital Storage'],
      featuresEs: ['Alta Resolución', 'Diseño Portátil', 'Múltiples Sondas', 'Almacenamiento Digital']
    }
  ];

  filteredProducts: Product[] = [...this.products];

  // Services
  services: Service[] = [
    {
      icon: '📦',
      title: 'Comprehensive Product Range',
      titleEs: 'Gama Integral de Productos',
      description: 'Office supplies, IT hardware, furniture, safety gear, construction materials, medical equipment, and more.',
      descriptionEs: 'Suministros de oficina, hardware IT, muebles, equipos de seguridad, materiales de construcción, equipos médicos y más.'
    },
    {
      icon: '🌍',
      title: 'Global Sourcing Network',
      titleEs: 'Red de Abastecimiento Global',
      description: 'We tap into a vast network of trusted suppliers worldwide to find the best products at competitive prices.',
      descriptionEs: 'Aprovechamos una vasta red de proveedores confiables en todo el mundo para encontrar los mejores productos a precios competitivos.'
    },
    {
      icon: '⚙️',
      title: 'Tailored Procurement Solutions',
      titleEs: 'Soluciones de Adquisiciones Personalizadas',
      description: 'Custom sourcing, bulk purchasing, and logistics management designed to fit your unique needs.',
      descriptionEs: 'Abastecimiento personalizado, compras al por mayor y gestión logística diseñada para satisfacer sus necesidades únicas.'
    },
    {
      icon: '🚚',
      title: 'Fast & Reliable Delivery',
      titleEs: 'Entrega Rápida y Confiable',
      description: 'Streamlined operations ensure timely delivery, no matter the size or complexity of your order.',
      descriptionEs: 'Las operaciones optimizadas garantizan la entrega oportuna, sin importar el tamaño o la complejidad de su pedido.'
    },
    {
      icon: '🌱',
      title: 'Sustainability & Compliance',
      titleEs: 'Sostenibilidad y Cumplimiento',
      description: 'We prioritize eco-friendly products and ensure all sourcing meets regulatory standards.',
      descriptionEs: 'Priorizamos los productos ecológicos y garantizamos que todo el abastecimiento cumpla con los estándares regulatorios.'
    }
  ];

  // Testimonials
  currentTestimonial = 0;
  testimonials: Testimonial[] = [
    {
      text: 'Sadaf Supply Group transformed our procurement process. Their attention to detail and global network saved us 30% on our annual supply costs.',
      textEs: 'Sadaf Supply Group transformó nuestro proceso de adquisiciones. Su atención al detalle y red global nos ahorró un 30% en nuestros costos anuales de suministros.',
      name: 'Sarah Johnson',
      position: 'Procurement Manager',
      company: 'TechCorp Industries',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=100'
    },
    {
      text: 'Exceptional service and quality products. They understand our healthcare facility needs and always deliver on time.',
      textEs: 'Servicio excepcional y productos de calidad. Entienden las necesidades de nuestra instalación de salud y siempre entregan a tiempo.',
      name: 'Dr. Michael Chen',
      position: 'Operations Director',
      company: 'Metro General Hospital',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100'
    },
    {
      text: 'From office supplies to specialized equipment, Sadaf Supply Group is our one-stop solution for everything we need.',
      textEs: 'Desde suministros de oficina hasta equipos especializados, Sadaf Supply Group es nuestra solución integral para todo lo que necesitamos.',
      name: 'Emily Rodriguez',
      position: 'Facility Manager',
      company: 'Global Education Systems',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100'
    }
  ];

  // Case Studies
  caseStudies: CaseStudy[] = [
    {
      title: 'Healthcare Facility Modernization',
      titleEs: 'Modernización de Instalaciones de Salud',
      summary: 'Complete equipment overhaul for a 500-bed hospital including medical devices, furniture, and safety equipment.',
      summaryEs: 'Renovación completa de equipos para un hospital de 500 camas incluyendo dispositivos médicos, muebles y equipos de seguridad.',
      image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400',
      stats: [
        {value: '30%', label: 'Cost Savings', labelEs: 'Ahorro en Costos'},
        {value: '45 days', label: 'Project Timeline', labelEs: 'Cronograma del Proyecto'},
        {value: '500+', label: 'Items Procured', labelEs: 'Artículos Adquiridos'}
      ]
    },
    {
      title: 'Manufacturing Plant Setup',
      titleEs: 'Configuración de Planta de Manufactura',
      summary: 'End-to-end procurement for new automotive manufacturing facility including industrial equipment and safety systems.',
      summaryEs: 'Adquisiciones de extremo a extremo para nueva instalación de manufactura automotriz incluyendo equipos industriales y sistemas de seguridad.',
      image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400',
      stats: [
        {value: '$2M+', label: 'Project Value', labelEs: 'Valor del Proyecto'},
        {value: '60 days', label: 'Completion Time', labelEs: 'Tiempo de Finalización'},
        {value: '15%', label: 'Under Budget', labelEs: 'Bajo Presupuesto'}
      ]
    }
  ];

  // Blog Posts
  blogPosts: BlogPost[] = [
    {
      title: 'The Future of Global Supply Chain Management',
      titleEs: 'El Futuro de la Gestión de la Cadena de Suministro Global',
      excerpt: 'Exploring how technology and sustainability are reshaping procurement strategies in 2025.',
      excerptEs: 'Explorando cómo la tecnología y la sostenibilidad están remodelando las estrategias de adquisiciones en 2025.',
      image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400',
      category: 'Industry Trends',
      date: new Date('2025-01-15'),
      readTime: 8
    },
    {
      title: 'Sustainable Procurement: A Complete Guide',
      titleEs: 'Adquisiciones Sostenibles: Una Guía Completa',
      excerpt: 'Learn how to implement eco-friendly procurement practices that benefit both your business and the environment.',
      excerptEs: 'Aprenda cómo implementar prácticas de adquisiciones ecológicas que beneficien tanto a su negocio como al medio ambiente.',
      image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400',
      category: 'Sustainability',
      date: new Date('2025-01-10'),
      readTime: 6
    },
    {
      title: 'Cost Optimization Strategies for Large Enterprises',
      titleEs: 'Estrategias de Optimización de Costos para Grandes Empresas',
      excerpt: 'Proven methods to reduce procurement costs while maintaining quality and compliance standards.',
      excerptEs: 'Métodos probados para reducir costos de adquisiciones mientras se mantienen los estándares de calidad y cumplimiento.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400',
      category: 'Cost Management',
      date: new Date('2025-01-05'),
      readTime: 5
    }
  ];

  // Form Data
  formData = {
    name: '',
    email: '',
    company: '',
    service: '',
    message: ''
  };

  ngOnInit() {
    this.initScrollAnimations();
    this.initTestimonialRotation();
    this.initScrollListener();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleLanguage() {
    this.currentLanguage = this.currentLanguage === 'en' ? 'es' : 'en';
  }

  // Product Methods
  filterProducts() {
    this.filteredProducts = this.products.filter(product => {
      const matchesSearch = !this.searchTerm || 
        product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesCategory = !this.selectedCategory || product.category === this.selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }

  openProductModal(product: Product) {
    this.selectedProduct = product;
    document.body.classList.add('modal-open');
  }

  closeModal() {
    this.selectedProduct = null;
    document.body.classList.remove('modal-open');
  }

  requestQuote(product: Product) {
    // Implement quote request logic
    alert(`Quote requested for: ${product.name}`);
  }

  contactSupplier() {
    // Implement supplier contact logic
    alert('Connecting you with our supplier network...');
  }

  // Chat Methods
  openChat() {
    // Implement live chat logic
    alert('Live chat feature would be implemented here with a chat service like Intercom or Zendesk');
  }

  // Case Study Methods
  openCaseStudy(caseStudy: CaseStudy) {
    // Implement case study modal or navigation
    alert(`Opening case study: ${caseStudy.title}`);
  }

  // Blog Methods
  openBlogPost(post: BlogPost) {
    // Implement blog post navigation
    alert(`Opening blog post: ${post.title}`);
  }

  // Form Methods
  submitForm() {
    if (this.isFormValid()) {
      // Implement form submission logic
      console.log('Form submitted:', this.formData);
      alert(this.currentLanguage === 'en' ? 
        'Thank you for your message! We will get back to you within 24 hours.' :
        '¡Gracias por tu mensaje! Te responderemos dentro de 24 horas.');
      this.resetForm();
    }
  }

  private isFormValid(): boolean {
    return !!(this.formData.name && this.formData.email && this.formData.company && 
           this.formData.service && this.formData.message);
  }

  private resetForm() {
    this.formData = {
      name: '',
      email: '',
      company: '',
      service: '',
      message: ''
    };
  }

  // Animation Methods
  private initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    }, { threshold: 0.1 });

    setTimeout(() => {
      document.querySelectorAll('.fade-in-up').forEach(el => observer.observe(el));
    }, 100);
  }

  private initTestimonialRotation() {
    setInterval(() => {
      this.currentTestimonial = (this.currentTestimonial + 1) % this.testimonials.length;
    }, 5000);
  }

  private initScrollListener() {
    window.addEventListener('scroll', () => {
      this.scrolled = window.scrollY > 50;
    });
  }
}