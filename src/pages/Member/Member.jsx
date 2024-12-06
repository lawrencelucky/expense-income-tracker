import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Ozi from "../../assets/ozi.jpeg";
import Lucky from "../../assets/lucky.jpeg";
import Chi from "../../assets/chi.jpeg";
import Chinks from "../../assets/chinks.jpeg";
import Ibe from "../../assets/ibe.jpeg";
import Profile from "../../components/Profile/Profile";
import "./member.css";

const Member = () => {
  return (
    <div>
      <Header />
      <div className="profile-section">
        <Profile
          image={Lucky}
          name="Lawrence Lucky Emmanuel"
          matric="FTP/CSC/25/0101999"
        />
        <Profile
          image={Ozi}
          name="Odina Ozioma Perfelina"
          matric="FTP/CSC/25/0102003"
        />
        <Profile
          image={Chi}
          name="Mbe Chidinma Nancy"
          matric="FTP/CSC/25/0102003"
        />
        <Profile
          image={Chinks}
          name="Emmanuel Ugochukwu Onwuka"
          matric="FTP/CSC/25/0102003"
        />
        <Profile
          image={Ibe}
          name="IBEMERE OGECHUKWU GODGIFT"
          matric="FTP/CSC/25/0092290"
        />
      </div>
      <Footer />
    </div>
  );
};

export default Member;
