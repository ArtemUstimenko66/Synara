import MainHeader from "../../modules/main-page/components/ui/MainHeader.tsx";
import Footer from "../../components/Footer.tsx";
import Wrapper from "../../ui/Wrapper.tsx";

// Новые анимации
const animationFadeIn = "animate-fadeIn";
const animationSlideIn = "animate-slideIn";
const scaleOnHover = "transition transform duration-300 ease-in-out hover:scale-110 hover:shadow-xl";

const TermsOfUsePage = () => {
	return (
		<Wrapper>
			<MainHeader />
			<div className="min-h-screen mt-24 ml-[3%] mr-[3%] font-montserratRegular text-black">
				<h1 className={`text-h2 font-kharkiv mb-8 ${animationFadeIn}`}>Умови використання</h1>

				{/* Иллюстрация */}
				<div className={`mb-12 ${scaleOnHover}`}>
					<img
						src="https://via.placeholder.com/1200x400"
						alt="Terms of Use illustration"
						className="w-full rounded-lg shadow-lg"
					/>
				</div>

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
						<img
							src="https://via.placeholder.com/600x300"
							alt="Content use illustration"
							className={`rounded-lg shadow-md mt-4 ${scaleOnHover}`}
						/>
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
						<div className="flex space-x-6 mt-4">
							<img
								src="https://via.placeholder.com/100"
								alt="No liability"
								className={`w-24 h-24 rounded-full ${scaleOnHover}`}
							/>
							<img
								src="https://via.placeholder.com/100"
								alt="Technical issues"
								className={`w-24 h-24 rounded-full ${scaleOnHover}`}
							/>
							<img
								src="https://via.placeholder.com/100"
								alt="Data safety"
								className={`w-24 h-24 rounded-full ${scaleOnHover}`}
							/>
						</div>
					</section>

					<section className={`${animationSlideIn} delay-500`}>
						<h2 className="text-h3 font-semibold mb-4">5. Конфіденційність</h2>
						<p>
							Ваші дані захищені відповідно до нашої <a href="/frontend/src/pages/privacy-policy/PrivacyPolicyPage" className="text-blue-700 hover:underline">Політики конфіденційності</a>.
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
							<a href="mailto:support@example.com" className="text-blue-700 hover:underline ml-2">
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
