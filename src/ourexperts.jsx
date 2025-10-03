import React, { useEffect } from 'react';

// Custom hook for Intersection Observer animations
const useAnimateOnScroll = () => {
  useEffect(() => {
    // We query the elements within this component's render cycle
    const animatedElements = document.querySelectorAll('#experts .animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, {
      threshold: 0.1
    });

    animatedElements.forEach(el => observer.observe(el));

    // Cleanup observer on component unmount
    return () => animatedElements.forEach(el => observer.unobserve(el));
  }, []);
};


const ExpertsPage = () => {
    useAnimateOnScroll(); // Activate scroll animations for this page

    const experts = [
    {
        name: "Dr. Muskan (PT)",
        title: "Physiotherapist | Matrix Rhythm Therapy Practitioner | Nutrition & Dietetics Specialist",
        details: [
            { 
                title: "Education & Qualifications", 
                items: [
                    "Bachelor of Physiotherapy (BPT) – 2023",
                    "Certified Matrix Rhythm Therapy Practitioner – Dr. Randoll Institute, Germany (2023)",
                    "Diploma in Applied Nutrition, Food Science & Dietetics – NFNA (2025)"
                ] 
            },
            { 
                title: "Professional Experience", 
                items: [
                    "Consultant Physiotherapist – Matrix German Therapy Centre, Mumbai, India (2023–2025)",
                    "Physiotherapy Home Visits – 2023–Present"
                ] 
            },
            { 
                title: "Specializations", 
                items: [
                    "Advanced Therapeutic Techniques",
                    "Nutritional & Dietary Guidance",
                    "Holistic Rehabilitation"
                ] 
            }
        ]
    },
    {
        name: "Dr. Chetana M. Jirage (PT)",
        title: "Matrix Rhythm Therapy Practitioner | Pelvic Floor Rehabilitation Specialist",
        details: [
            { title: "Education & Qualifications", items: ["Bachelor of Physiotherapy (BPT) – 2022", "Certified Matrix Rhythm Therapy Practitioner – Dr. Randoll Institute, Germany (2022)", "Certified Female Pelvic Floor Rehabilitation Specialist"] },
            { title: "Professional Experience", items: ["Consultant Physiotherapist – Matrix German Therapy Centre, Mumbai, India (2022–2024)", "Pelvic Floor Physiotherapist – JOGO Health Pvt. Ltd., India (2024–2025)"] },
            { title: "Specializations", items: ["Matrix Rhythm Therapy", "Female Pelvic Floor Rehabilitation", "Pain Management & Functional Rehabilitation"] }
        ]
    },
    {
        name: "Dr. Nazmeen Shaikh (PT)",
        title: "Musculoskeletal & Rehabilitation Specialist",
        details: [
             { title: "Education & Qualifications", items: ["Bachelor of Physiotherapy (BPT) – 2023"] },
             { title: "Professional Experience", items: ["Consultant Physiotherapist – Dr. Dac’s Ayansh Hospital, Bhiwandi, India (Current)", "Physiotherapy Home Visits – 2023–Present", "Consultant Physiotherapist – Dr. Vanga Polyclinic, Bhiwandi, India (2023–2024)", "Consultant Physiotherapist – Matrix German Therapy Centre, Mumbai, India (2024–2025)"] }
        ]
    }
];


     const testimonials = [
        { name: "Nanda Uttam", case: "Case of Total knee replacement", review: "I have recently booked a physiotherapist for my mother, and the service was absolutely wonderful. Dr. Nazmeen was therapist and she is professional, attentive, and tailored the treatment exactly as per our requirement My mother experienced noticeable relief from her pain, and we're truly grateful for the care provided. Highly recommended!" },
        { name: "Priyanka Sharma", case: "Case of Slipped Disc", review: "I had a great experience with my physiotherapy sessions by Dr. Muskan . The treatment helped relieve my back pain and improved my mobility significantly. The staff was professional, friendly, and always supportive. I’m feeling much better now." },
        { name: "Zoya pathan", case: "Case of chronic neck pain", review: "I had been struggling with persistent neck pain for several weeks before starting physiotherapy. After a few sessions, I noticed significant improvement in my mobility and a reduction in pain. The therapist Dr Chetna was professional, explained each step clearly, and provided exercises that helped me regain strength and flexibility. I'm now almost pain-free and very satisfied with the treatment. Highly recommend!" }
    ];

    return (
         <section id="experts" className="py-5 bg-light" style={{paddingTop:'2rem',position:'relative'}}>
            <div className="container">
                <div className="row text-center">
                    <div className="col-12 animate-on-scroll">
                        <h2 className="section-title">Our Experts</h2>
                        <p className="section-subtitle">Meet our team of highly qualified and experienced physiotherapists.</p>
                    </div>
                </div>
                <div className="row g-4 justify-content-center">
                   {experts.map((expert, index) => (
                       <div key={index} className="col-md-6 col-lg-4 animate-on-scroll" >
                           <div className="feature-card" style={{borderColor: '#22c55e'}}>
                               <div className="feature-content" style={{textAlign: 'left', top:'2rem',position:'relative'}}>
                                   <div className="feature-icon"><i className="bi bi-person-check-fill"></i></div>
                                   <h5 className="text-center">{expert.name}</h5>
                                   {expert.title && <p className="text-center text-success fw-bold">{expert.title}</p>}
                                   {expert.bio && <p style={{fontSize: '0.9rem'}}>{expert.bio}</p>}
                                   {expert.details && expert.details.map((section, sIndex) => (
                                       <div key={sIndex} className="mt-3">
                                           <h6>{section.title}</h6>
                                           <ul className="list-unstyled" style={{fontSize: '0.9rem'}}>
                                               {section.items.map((item, iIndex) => <li key={iIndex} className="d-flex"><i className="bi bi-check-circle-fill text-success me-2 mt-1"></i><span>{item}</span></li>)}
                                           </ul>
                                       </div>
                                   ))}
                               </div>
                           </div>
                       </div>
                   ))}
                </div>

                 <div className="row text-center mt-3 pt-4">
                    <div className="col-12 animate-on-scroll">
                        <h2 className="section-title">Testimonials</h2>
                        <p className="section-subtitle">What our patients are saying about their recovery journey with us.</p>
                    </div>
                </div>
                <div className="row g-4">
                    {testimonials.map((item, index) => (
                        <div key={index} className="col-md-6 col-lg-4 animate-on-scroll">
                            <div className="feature-card h-100">
                               <div className="feature-content" style={{textAlign: 'left'}}>
                                    <div className="d-flex align-items-center mb-3">
                                         <div className="feature-icon" style={{margin: 0, marginRight: '1rem'}}><i className="bi bi-person-fill"></i></div>
                                         <div>
                                            <h6 className="mb-0">{item.name}</h6>
                                            <small className="text-muted">{item.case}</small>
                                         </div>
                                    </div>
                                    <p className="fst-italic">"{item.review}"</p>
                               </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ExpertsPage;
