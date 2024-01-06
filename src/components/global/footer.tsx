import Image from 'next/image';
import '@/styles/footer.scss';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer_columns">
        <div className="footer_icon footer_column">
          <img
            src="images/logo.png" 
            alt="Footer"
            width={75} 
            height={71}
            className="footer_logo"
          />
        </div>
          <div className="footer_column">
            <h5>Product</h5>
            <ul>
              <li><a href="/">Product</a></li>
              <li><a href="/">Trending</a></li>
              <li><a href="/">Guided</a></li>
              <li><a href="/">Products</a></li>
            </ul>
          </div>
          <div className="footer_column">
            <h5>Company</h5>
            <ul>
              <li><a href="/">Press</a></li>
              <li><a href="/">Mission</a></li>
              <li><a href="/">Strategy</a></li>
              <li><a href="/">About</a></li>
            </ul>
          </div>
          <div className="footer_column">
            <h5>Info</h5>
            <ul>
              <li><a href="/">Support</a></li>
              <li><a href="/">Customer Service</a></li>
              <li><a href="/">Get Started</a></li>
            </ul>
          </div>

          <div className="footer_column">
            <h5>Follow Us</h5>
            <div className="footer_social_icons">
            <Image
              src="/images/fa_facebook.svg" 
              alt="Facebook"
              width={24} 
              height={24}
              className="footer_logo"
            />
            <Image
              src="/images/fa_google.svg" 
              alt="Google"
              width={24} 
              height={24}
              className="footer_logo"
            />
            <Image
              src="/images/fa_twitter.svg" 
              alt="Twitter X"
              width={24} 
              height={24}
              className="footer_logo"
            />
            </div>
          </div>
        </div>    
        <div className="footer_bottom">
          <p>&copy; 2023 Men{"'"}s Health All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
