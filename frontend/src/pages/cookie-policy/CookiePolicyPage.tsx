import MainHeader from "../../modules/main-page/components/ui/MainHeader.tsx";
import Footer from "../../components/Footer.tsx";
import Wrapper from "../../ui/Wrapper.tsx";

const animationFadeIn = "animate-fadeIn";
const animationSlideIn = "animate-slideIn";

const CookiePolicyPage = () => {
	return (
		<Wrapper>
			<MainHeader />
			<div className="min-h-screen mt-24 mx-[10vw] font-montserratRegular text-black">
				<h1 className={`text-h3 font-kharkiv mb-8 ${animationFadeIn}`}>Політика використання cookie</h1>

				{/* Контент с анимациями */}
				<div className="space-y-10 text-lg leading-relaxed">
					<section className={`${animationSlideIn} delay-100`}>
						<h2 className="text-h5 font-semibold mb-4">1. Вступ</h2>
						<p className="text-pl">
							Ця політика описує, як ми використовуємо кукі на нашому сайті. Використовуючи наш сайт, ви погоджуєтеся на використання кукі відповідно до цієї політики.
						</p>
					</section>

					<section className={`${animationSlideIn} delay-200`}>
						<h2 className="text-h5 font-semibold mb-4">2. Що таке кукі?</h2>
						<p className="text-pl">
							Кукі — це маленькі текстові файли, які зберігаються на вашому пристрої під час перегляду веб-сайтів. Вони використовуються для зберігання інформації про ваші дії та уподобання.
						</p>
					</section>

					<section className={`${animationSlideIn} delay-300`}>
						<h2 className="text-h5 font-semibold mb-4">3. Чому ми використовуємо кукі?</h2>
						<p className="text-pl">
							Ми використовуємо кукі, щоб поліпшити ваш досвід на сайті, зберігаючи ваші налаштування та уподобання. Це також дозволяє нам аналізувати, як ви використовуєте наш сайт.
						</p>
					</section>

					<section className={`${animationSlideIn} delay-400`}>
						<h2 className="text-h5 font-semibold mb-4">4. Які типи кукі ми використовуємо?</h2>
						<p className="text-pl">
							Ми використовуємо такі типи кукі:
							<ul className="list-disc list-inside">
								<li>Необхідні кукі: для забезпечення функціональності сайту.</li>
								<li>Аналітичні кукі: для збору даних про використання сайту.</li>
								<li>Функціональні кукі: для запам'ятовування ваших уподобань.</li>
							</ul>
						</p>
					</section>

					<section className={`${animationSlideIn} delay-500`}>
						<h2 className="text-h5 font-semibold mb-4">5. Як керувати кукі?</h2>
						<p className="text-pl">
							Ви можете налаштувати ваш браузер так, щоб він відмовлявся від кукі або сповіщав вас про їх використання. Проте, якщо ви відмовитеся від кукі, деякі функції сайту можуть бути обмежені.
						</p>
					</section>

					<section className={`${animationSlideIn} delay-600`}>
						<h2 className="text-h5 font-semibold mb-4">6. Зміни до політики кукі</h2>
						<p className="text-pl">
							Ми залишаємо за собою право в будь-який час змінювати цю політику. Всі зміни набирають чинності після їх публікації на цій сторінці.
						</p>
					</section>

					<section className={`${animationSlideIn} delay-700`}>
						<h2 className="text-h5 font-semibold mb-4">7. Контакти</h2>
						<p className="text-pl">
							Якщо у вас є питання щодо цієї політики, будь ласка, зв'яжіться з нами за адресою:
							<a href="mailto:synara.support@email.com" className="text-blue-700 hover:underline ml-2">
								synara.support@email.com
							</a>.
						</p>
					</section>
				</div>
			</div>

			<Footer />
		</Wrapper>
	);
};

export default CookiePolicyPage;
