import logoMain from '../../img/sergii1.png';
import logoAdditional from '../../img/ravent1.png';

function Header() {
    return (
    <div className="logo">
        <img className="logo_main" alt="main logo" src={logoMain}/>
        <img className="logo_additional"  alt="additional logo" src={logoAdditional}/>
    </div>
  )
}

export default Header;