import Banner from '@/components/Banner';
import Navbar from '@/components/Navbar';
import styles from './page.module.css';

export default function Home() {
	return (
		<main className={styles.main}>
			<Navbar username="relaxedleaf"/>
			<Banner
				title='Clifford the red dog'
				subTitle='a very cute dog'
				imgUrl='/static/clifford.webp'
			/>
		</main>
	);
}
