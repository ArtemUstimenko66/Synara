import MainHeader from "../../modules/main-page/components/ui/MainHeader.tsx";
import Footer from "../../components/Footer.tsx";
import Wrapper from "../../ui/Wrapper.tsx";
import {Helmet} from "react-helmet-async";

const animationFadeIn = "animate-fadeIn";
const animationSlideIn = "animate-slideIn";

const CookiePolicyPage = () => {
	return (
		<Wrapper>
			<Helmet>
				<title>Політика використання cookie - Synara</title>
				<meta name="description" content="Дізнайтеся про нашу політику використання кукі на платформі Synara." />
				<meta name="keywords" content="кукі, політика, Synara, українці, конфіденційність" />
				<meta name="robots" content="index, follow" />
				<link rel="canonical" href="https://synara.help/cookie-policy" />
			</Helmet>
			<MainHeader />
			<div className="min-h-screen mt-24 mx-[10vw] font-montserratRegular text-black">
				<h1 className={`text-h3 font-kharkiv mb-8 ${animationFadeIn}`}>Політика використання cookie</h1>

				{/* Контент с анимациями */}
				<div className="space-y-10 text-lg leading-relaxed">
					<section className={`${animationSlideIn} delay-100`}>
						<h2 className="text-h5 font-semibold mb-4">Політика використання файлів Cookie</h2>
						<p className="text-pl">
							Ця Політика використання файлів Cookie пояснює, як наш сайт використовує файли cookie, та
							які дані збираються з їх допомогою. Ми прагнемо забезпечити прозорість щодо того, як
							обробляються ваші персональні дані під час користування нашим сайтом.
						</p>
					</section>

					<section className={`${animationSlideIn} delay-200`}>
						<h2 className="text-h5 font-semibold mb-4">Що таке файли Cookie?</h2>
						<p className="text-pl">
							Файли cookie — це невеликі текстові файли, які зберігаються на вашому пристрої (комп'ютері,
							планшеті, смартфоні) під час відвідування вебсайтів. Вони використовуються для того, щоб
							вебсайт запам'ятав ваші дії та налаштування (наприклад, мову або налаштування відображення),
							а також для поліпшення користувацького досвіду.
						</p>
					</section>

					<section className={`${animationSlideIn} delay-300`}>
						<h2 className="text-h5 font-semibold mb-4">Які типи файлів Cookie ми використовуємо?</h2>
						<p className="text-pl">
							Наш сайт використовує різні типи файлів cookie:
						</p>
						<ul className="list-disc list-inside">
							<li><strong>Сесійні файли cookie:</strong> Зберігаються лише протягом часу вашого сеансу на
								сайті і автоматично видаляються після його завершення.
							</li>
							<li><strong>Постійні файли cookie:</strong> Зберігаються на вашому пристрої протягом певного
								часу або до їхнього видалення вручну. Вони дозволяють нашому сайту запам'ятовувати ваші
								налаштування при повторному відвідуванні.
							</li>
							<li><strong>Файли cookie сторонніх організацій:</strong> Це файли cookie, які встановлюються
								сторонніми сервісами, наприклад, для аналітики (Google Analytics) або інтеграції
								соціальних мереж (X (Twitter)).
							</li>
						</ul>
					</section>

					<section className={`${animationSlideIn} delay-400`}>
						<h2 className="text-h5 font-semibold mb-4">Для чого ми використовуємо файли Cookie?</h2>
						<p className="text-pl">
							Ми використовуємо такі типи кукі:
						</p>
						<ul className="list-disc list-inside">
							<li><strong>Функціональність сайту:</strong> Ми використовуємо файли cookie для забезпечення коректної роботи нашого сайту та покращення зручності його використання. Вони дозволяють зберігати ваші особисті налаштування та покращувати навігацію.</li>
							<li><strong>Аналітика:</strong> Ми використовуємо файли cookie для збору анонімної статистичної інформації про те, як відвідувачі використовують наш сайт. Це допомагає нам покращувати його роботу, виявляти проблеми та оптимізувати контент.</li>
							<li><strong>Реклама та маркетинг:</strong> Сторонні файли cookie можуть використовуватися для показу персоналізованих оголошень або збору інформації для аналітики рекламних кампаній.</li>
						</ul>
					</section>


					<section className={`${animationSlideIn} delay-500`}>
						<h2 className="text-h5 font-semibold mb-4">Як керувати файлами Cookie?</h2>
						<p className="text-pl">
							У більшості браузерів ви можете керувати файлами cookie через налаштування. Ви можете
							видаляти або блокувати файли cookie, але це може вплинути на функціональність нашого сайту.
						</p>
						<ul className="list-disc list-inside">
							<li>Щоб керувати файлами cookie у вашому браузері, ви можете відвідати розділи налаштувань або використати інструкції відповідного браузера (Google Chrome, Mozilla Firefox, Safari, Edge тощо).
							</li>
							<li>Якщо ви хочете відмовитися від файлів cookie, що використовуються сторонніми сервісами для реклами, ви можете зробити це через налаштування реклами таких сервісів.
							</li>
						</ul>
					</section>

					<section className={`${animationSlideIn} delay-600`}>
						<h2 className="text-h5 font-semibold mb-4"> Зміни до Політики використання файлів Cookie</h2>
						<p className="text-pl">
							Ми можемо оновлювати цю Політику час від часу, публікуючи нову версію на нашому сайті. Ми рекомендуємо регулярно переглядати цю сторінку, щоб бути в курсі змін у використанні файлів cookie.
						</p>
					</section>

					<section className={`${animationSlideIn} delay-700`}>
						<h2 className="text-h5 font-semibold mb-4">Контактна інформація</h2>
						<p className="text-pl">
							Якщо у вас виникли питання щодо нашої Політики використання файлів Cookie або ви хочете отримати більше інформації, будь ласка, зв'яжіться з нами за електронною адресою:
							<a href="mailto:synara.support@email.com" className="text-blue-700 hover:underline ml-2">
								synara.support@email.com
							</a>.
						</p>
						<p className="text-pl mt-5">
							Ця Політика використання файлів Cookie розроблена для того, щоб гарантувати прозорість та інформованість користувачів нашого сайту щодо використання cookie та збереження їхнього приватного простору.
						</p>
					</section>
				</div>
			</div>

			<Footer/>
		</Wrapper>
	);
};

export default CookiePolicyPage;
