import React from 'react';
import '@/styles/serviceSection.scss';

interface ServiceSectionProps {
  sectionHeading?: string;
  imageUrl: string;
  title: string;
  subtitle: string;
  content: React.ReactNode;
  swapOrder?: boolean;
  bgText: string;
}

const ServiceSection: React.FC<ServiceSectionProps> = ({ sectionHeading, imageUrl, title, subtitle, content, swapOrder = false, bgText }) => {
  const orderClass = swapOrder ? 'reverseOrder' : '';

  return (
    <section className="serviceSection_container container">
      {
        sectionHeading && (
          <h3 className='serviceSection_heading'>
            {sectionHeading}
          </h3>
        )
      }
      <div className={`serviceSection ${orderClass}`}>
        <div className="imageSection">
          <img src={imageUrl} alt="Service" className="serviceImage" />
        </div>
        <div className="contentSection">
          <div className={`backgroundText ${orderClass}`}>
            <div className="bigText">{bgText}</div>
          </div>
          <div className='service_name'>{title}</div>
          <div className='service_description'>{subtitle}</div>
          <div className="service_content">{content}</div>
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
