import Image from "next/image";
import logo from "../public/images/Pokemon-icon.png";
export default function List() {
    const styles = {
        wrapper:"",
        button:"absolute top-0 left-0",
    };
    return(<>
        <div>
        <button className={styles.button}>
        <div className="flex">
        <Image src={logo} alt="Pokemon Logo" width={70} height={70} />
        <p>List</p>
        </div>
        </button>
        </div>
        </>
    );
}

