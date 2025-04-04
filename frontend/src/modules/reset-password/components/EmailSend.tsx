import { Button } from "../../../ui/Button.tsx";
import {sendResetEmail} from "../api/resetPasswordService.ts";
import {useTranslation} from "react-i18next";

type EmailSendProps = {
    email: string;
};

const EmailSend: React.FC<EmailSendProps> = ({ email }) => {

    const handleSubmit = async () => {
        try {
            await sendResetEmail(email);
           // console.log('Success resend');
        } catch (error: any) {
            console.error('Error resend:', error);
        }
    };

    const {t}= useTranslation();

    return (
        <div className="flex flex-col w-full mt-24">
            <div className="flex w-full space-x-4 mb-4 mt-10">
                <div className="w-full mb-4">
                    <h1 className="uppercase text-center font-kharkiv xl:text-relative-h3 sm:text-relative-xlh2 md:text-relative-h2 mb-relative-ssm mt-relative-ssm">
                        {t('we_sent_email_restore_password')}
                    </h1>
                    <h2 className="font-montserratRegular text-center xl:text-relative-pl sm:text-relative-h2 md:text-relative-h4 mb-relative-ssm mt-relative-ssm">
                        {t('we_sent_email')} <b>{email}</b>
                    </h2>
                    <h2 className="font-montserratRegular text-center xl:text-relative-pl sm:text-relative-h2 md:text-relative-h4 mb-relative-ssm mt-relative-ssm">
                        {t('check_email_reset_password')}
                    </h2>
                </div>
            </div>
            <div className="flex flex-col items-center justify-center">
                <Button
                    isFilled={true}
                    onClick={handleSubmit}
                    className="uppercase bg-perfect-yellow xl:w-1/2 sm:w-full text-almost-black py-3 rounded-full mb-5 hover:bg-perfect-yellow transition"
                >
                    {t('resend_email')}
                </Button>
            </div>
        </div>
    );
};

export default EmailSend;
