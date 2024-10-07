import MainHeader from "../../modules/main-page/components/ui/MainHeader.tsx";
import Footer from "../../components/Footer.tsx";
import Wrapper from "../../ui/Wrapper.tsx";


const PrivacyPolicyPage = () => {
	return (
		<Wrapper>
			<MainHeader />
			<div className="min-h-screen mt-24 ml-[3%] mr-[3%] font-montserratRegular">
				<h1 className="sm:text-h4 xl:text-h2 md:text-h2 font-kharkiv mb-8">Політика конфіденційності</h1>


				<div className="space-y-10 text-lg leading-relaxed">
					<section>
						<h2 className="text-h3 font-semibold mb-4">1. Вступ</h2>
						<p>
							Ми розуміємо, наскільки важлива конфіденційність вашої інформації.
							Наш сайт надає допомогу людям, які потребують гуманітарної, психологічної та матеріальної підтримки,
							і ми зобов'язуємось дбайливо обробляти вашу особисту інформацію. Цей розділ описує,
							як ми збираємо та використовуємо ваші персональні дані.
						</p>
					</section>

					<section >
						<h2 className="text-h3 font-semibold mb-4">2. Збір інформації</h2>
						<p>
							Під час використання нашого сайту, ми можемо збирати такі типи інформації:
							<ul className="list-disc ml-5 mt-2">
								<li>Ваші ім'я, електронна пошта та номер телефону.</li>
								<li>Деталі запитів на психологічну або гуманітарну допомогу.</li>
								<li>Інформацію про ваше місцезнаходження для координації допомоги.</li>
								<li>Технічну інформацію, як-от IP-адреса, тип браузера.</li>
							</ul>
						</p>
					</section>

					<section>
						<h2 className="text-h3 font-semibold mb-4">3. Використання даних</h2>
						<p>
							Зібрані дані використовуються для таких цілей:
							<ul className="list-disc ml-5 mt-2">
								<li>Надання гуманітарної та психологічної підтримки у скрутні часи.</li>
								<li>Зв'язок з вами з метою координації допомоги.</li>
								<li>Покращення роботи сайту та наших сервісів.</li>
							</ul>
						</p>
					</section>

					<section>
						<h2 className="text-h3 font-semibold mb-4">4. Захист інформації</h2>
						<p>
							Ми вживаємо всіх можливих заходів для захисту вашої інформації.
							Ваші дані зберігаються на захищених серверах із шифруванням.
							Доступ до інформації має лише обмежена кількість співробітників, які займаються наданням допомоги.
						</p>

					</section>

					<section >
						<h2 className="text-h3 font-semibold mb-4">5. Права користувачів</h2>
						<p>
							Ви маєте право на доступ до своїх даних, їх корекцію та видалення. Ми надаємо можливість відмовитися від подальшої обробки ваших даних у будь-який час.
						</p>
					</section>

					<section >
						<h2 className="text-h3 font-semibold mb-4">6. Передача даних третім особам</h2>
						<p>
							Ми не передаємо вашу інформацію третім особам без вашої згоди, окрім випадків, коли цього вимагає закон або це необхідно для надання допомоги.
						</p>
					</section>

					<section>
						<h2 className="text-h3 font-semibold mb-4">7. Зміни до політики конфіденційності</h2>
						<p>
							Ця політика може бути змінена у разі потреби. Усі зміни будуть опубліковані на цій сторінці.
						</p>
					</section>

					<section >
						<h2 className="text-h3 font-semibold mb-4">8. Контакти</h2>
						<p>
							Якщо у вас виникли питання, будь ласка, зв'яжіться з нами:
							<a href="mailto:synara.support@email.com" className="text-blue-500 hover:underline ml-2">
								synara.support@email.com
							</a>
						</p>
					</section>
				</div>
			</div>

			{/* Футер */}
			<Footer />
		</Wrapper>
	);
};

export default PrivacyPolicyPage;
