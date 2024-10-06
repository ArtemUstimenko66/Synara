import MainHeader from "../../modules/main-page/components/ui/MainHeader.tsx";
import Footer from "../../components/Footer.tsx";
import Wrapper from "../../ui/Wrapper.tsx";
import {Link} from "react-router-dom";

const animationFadeIn = "animate-fadeIn";
const animationSlideIn = "animate-slideIn";

const TermsOfUsePage = () => {
	return (
		<Wrapper>
			<MainHeader />
			<div className="min-h-screen mt-24 ml-[3%] mr-[3%] font-montserratRegular text-black">
				<h1 className={`text-h2 font-kharkiv mb-8 ${animationFadeIn}`}>Умови використання</h1>

				{/* Контент с анимациями */}
				<div className="space-y-10 text-lg leading-relaxed">
					<section className={`${animationSlideIn} delay-100`}>
						<h2 className="text-h3 font-semibold mb-4">1. Вступ</h2>
						<p>
							Ці умови використання визначають правила користування сайтом для
							отримання гуманітарної, психологічної та матеріальної допомоги.
							Використовуючи наш сайт, ви погоджуєтесь з цими умовами. Якщо ви не погоджуєтеся з будь-яким із пунктів,
							будь ласка, не використовуйте сайт.
						</p>
					</section>

					<section className={`${animationSlideIn} delay-200`}>
						<h2 className="text-h3 font-semibold mb-4">2. Використання контенту</h2>
						<p>
							Весь контент, опублікований на нашому сайті, включаючи тексти,
							зображення та інші матеріали, є власністю нашої організації або партнерів.
							Будь-яке копіювання, розповсюдження чи використання контенту без попередньої згоди є порушенням авторських прав.
						</p>
					</section>

					<section className={`${animationSlideIn} delay-300`}>
						<h2 className="text-h3 font-semibold mb-4">3. Відповідальність користувачів</h2>
						<p>
							Користуючись сайтом, ви зобов'язуєтесь надавати правдиву інформацію
							про себе під час запитів на допомогу. Ви також погоджуєтесь не
							використовувати сайт для незаконної діяльності або спроб завдати шкоди іншим користувачам.
						</p>
					</section>

					<section className={`${animationSlideIn} delay-400`}>
						<h2 className="text-h3 font-semibold mb-4">4. Відмова від відповідальності</h2>
						<p>
							Наша організація не несе відповідальності за можливі технічні
							помилки на сайті або за втрату даних внаслідок використання
							сайту. Ми не гарантуємо безперервну роботу сервісу, але робимо все можливе для цього.
						</p>
					</section>

					<section className={`${animationSlideIn} delay-500`}>
						<h2 className="text-h3 font-semibold mb-4">5. Конфіденційність</h2>
						<p>
							Ваші дані захищені відповідно до нашої <Link to="/privacy-policy" className="text-blue-700 hover:underline">Політики конфіденційності</Link>.
							Ми вживаємо необхідних заходів для забезпечення безпеки персональної інформації, але користувачі також повинні вживати заходів для захисту своїх облікових записів.
						</p>
					</section>

					<section className={`${animationSlideIn} delay-600`}>
						<h2 className="text-h3 font-semibold mb-4">6. Зміни до умов використання</h2>
						<p>
							Ми залишаємо за собою право змінювати ці умови в будь-який час.
							Всі зміни набувають чинності після їх публікації на цій сторінці.
							Продовжуючи використовувати сайт після зміни умов, ви погоджуєтесь з новими правилами.
						</p>
					</section>

					<section className={`${animationSlideIn} delay-700`}>
						<h2 className="text-h3 font-semibold mb-4">7. Контакти</h2>
						<p>
							Якщо у вас є питання щодо цих умов використання, будь ласка, зв'яжіться з нами за адресою:
							<a href="mailto:synara.support@email.com" className="text-blue-700 hover:underline ml-2">
								support@example.com
							</a>.
						</p>
					</section>
				</div>
			</div>

			<Footer />
		</Wrapper>
	);
};

export default TermsOfUsePage;
