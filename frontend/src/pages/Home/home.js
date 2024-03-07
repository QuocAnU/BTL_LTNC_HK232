
import logo from './../../assets/images/mykar3.svg'
import classNames from 'classnames/bind'
import styles from './home.module.scss'
const cx = classNames.bind(styles);
const navigateLogin = () => {
     window.location.assign("./../../admin/Login") //cho nay dung hay sai em cung k biet:))
  };
const Home = () => {

    return (
        <div className={cx('home-tile')}>Home page
                <div className={cx('logo-image')}> <img src={logo} alt='logo' className={cx('image')} /> </div>
                <button className={cx('button')} type="submit"  onClick={navigateLogin}>Login</button>
        </div>


    )
}

export default Home