
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faQq, 
  faTelegram, 
  faFacebookMessenger
} from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

// 页面元数据 - 现在可以正常导出，因为这是服务器组件
export const metadata = { title: '联系', description: '联系流月：QQ、Telegram、Messenger 或邮件，欢迎交流与合作。' };


export default function ContactPage() {
  return (
    <div className="contact-page">
      <div className="page-header">
        <h1>联系流月</h1>
      </div>

      <div className="contact-content">
        <p>
          谢谢你愿意花时间走进这个小小的数字角落，无论是想聊聊学习生活、分享有趣的想法，还是有什么想一起尝试的事，我都很乐意倾听。
        </p>

        <p>你可以通过以下方式联系我：</p>

        <ul className="contact-list">
          <li className="contact-item">
            <FontAwesomeIcon icon={faQq} className="contact-icon" />
            <span className="contact-label">QQ：</span>
            <Link 
              href="https://qm.qq.com/q/v3VfUACVCq" 
              target="_blank" 
              rel="noopener noreferrer"
              className="contact-link"
            >
              3041495206
            </Link>
          </li>
          
          <li className="contact-item">
            <FontAwesomeIcon icon={faTelegram} className="contact-icon" />
            <span className="contact-label">Telegram：</span>
            <Link 
              href="https://t.me/gbhf0020" 
              target="_blank" 
              rel="noopener noreferrer"
              className="contact-link"
            >
              @gbhf0020
            </Link>
          </li>
          
          <li className="contact-item">
            <FontAwesomeIcon icon={faFacebookMessenger} className="contact-icon" />
            <span className="contact-label">Messenger：</span>
            <Link 
              href="https://www.messenger.com/t/156025504001094" 
              target="_blank" 
              rel="noopener noreferrer"
              className="contact-link"
            >
              Yue Liu
            </Link>
          </li>
          
          <li className="contact-item">
            <FontAwesomeIcon icon={faEnvelope} className="contact-icon" />
            <span className="contact-label">电子邮件：</span>
            <Link 
              href="mailto:hi@sitrmoo.com"
              className="contact-link"
            >
              hi@sitrmoo.com
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
    