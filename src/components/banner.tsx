import React from 'react';
import '@/styles/banner.scss'

interface BannerProps {
  title: string;
  subtitle: string;
  buttonText: string;
  imageUrl: string;
  logo: string;
  onQuizButtonClick: () => void;
}

const Banner: React.FC<BannerProps> = ({ title, subtitle, buttonText, imageUrl, logo, onQuizButtonClick }) => {
  return (
    <section className="background_green">
      <div className="container banner">
        <img src={logo} alt="Logo" className="icon"/>
        <div className="content">
          <h1>{title}</h1>
          <p>{subtitle}</p>
          <button className="btn_red mt_30" onClick={onQuizButtonClick}>{buttonText}</button>
        </div>
        <div className="image">
          <img src={imageUrl} alt="Banner" />
        </div>
      </div>
    </section>
  );
};

export default Banner;
