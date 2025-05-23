import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import "./globals.css";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html>
      <body>
        <Navbar />
        <div>
          <main>{children}</main>
        </div>
        <Footer />
      </body>
    </html>
  );
};

export default Layout;
