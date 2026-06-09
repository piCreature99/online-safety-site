import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Shield, Eye, Lock, Key, TrendingUp, Coins, Phone,
  Smartphone, Mail, CreditCard, Heart, Clock, Brain,
  AlertTriangle, FileWarning, UserX, Link2, Banknote,
  RefreshCw, Search, Diamond, Users, ChevronRight,
  Flag, PhoneOff, Landmark, ShieldCheck, CheckCircle,
  XCircle, LockKeyhole, ScanLine, HandCoins, BookmarkCheck,
  Target, Zap, AlertOctagon, Megaphone,
  Info, ArrowUp,
  Play,
  Pause,
  VolumeX,
  Volume2,
  Maximize,
  Maximize2,
  Download,
  X,
  ShieldAlert,
  AlertCircle,
  ChevronDown,
  Share2,
  Video,
  Globe,
  FileCode,
  ShoppingBag,
  BrainCircuit,
  Sparkles,
  DollarSign,
  ExternalLink,
  HelpCircle
} from 'lucide-react';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription
} from '@/components/ui/dialog';
import * as Dialog2 from '@radix-ui/react-dialog';
import * as Accordion from '@radix-ui/react-accordion';

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════
   DATA - DETAIL CONTENT FOR DIALOGS
   ═══════════════════════════════════════════ */

const FRAUD_DETAILS = [
  {
    id: 1, icon: <Mail className="w-8 h-8" />, title: 'Phishing',
    desc: 'Lừa đảo qua email và website giả mạo là hình thức phổ biến nhất.',
    how: 'Tội phạm tạo website hoặc email trông giống hệt ngân hàng, dịch vụ lớn (Netflix, Shopee, Facebook). Email thường có nội dung khẩn cấp như "Tài khoản sắp bị khóa" hoặc "Nhận thưởng giá trị lớn" để buộc nạn nhân click link giả.',
    signs: ['URL có lỗi chính tả (ví dụ: facebo0k.com, vietcombamk.com)', 'Email gửi từ địa chỉ @gmail.com thay vì @domain chính thức', 'Yêu cầu nhập mật khẩu, OTP, thông tin thẻ', 'Thiết kế kém chất lượng, logo mờ, font chữ lạ'],
    protect: ['Không click link trong email lạ', 'Gõ trực tiếp URL vào trình duyệt', 'Kiểm tra chứng chỉ SSL (biểu tượng ổ khóa)', 'Bật 2FA cho tất cả tài khoản'],
    color: 'bg-amber/10 text-amber',
  },
  {
    id: 2, icon: <Smartphone className="w-8 h-8" />, title: 'Smishing',
    desc: 'Lừa đảo qua tin nhắn SMS.',
    how: 'Gửi tin nhắn giả mạo cơ quan chức năng (BHXH, thuế, công an), ngân hàng, hoặc dịch vụ giao hàng. Tin nhắn chứa link rút gọn (bit.ly, tinyurl) dẫn đến trang đăng nhập giả mạo. Tại Việt Nam, hàng triệu tin nhắn lừa đảo được gửi mỗi ngày.',
    signs: ['Số điện thoại lạ (thường là số quốc tế)', 'Link rút gọn không rõ nguồn gốc', 'Nội dung khẩn cấp: "Tài khoản bị khóa"', 'Yêu cầu cập nhật thông tin qua link'],
    protect: ['Không click link trong SMS từ số lạ', 'Gọi hotline chính thức để xác minh', 'Không cung cấp thông tin qua tin nhắn', 'Dùng app chính thức thay vì link'],
    color: 'bg-copper/10 text-copper',
  },
  {
    id: 3, icon: <Phone className="w-8 h-8" />, title: 'Vishing',
    desc: 'Lừa đảo qua cuộc gọi thoại (Voice Phishing).',
    how: 'Giả danh cảnh sát, viện kiểm sát, nhân viên ngân hàng gọi điện trực tiếp. Thường dùng kịch bản "Bạn liên quan vụ án rửa tiền" hoặc "Tài khoản ngân hàng bị đánh cắp" để đe dọa. Yêu cầu chuyển tiền vào tài khoản "an toàn" để kiểm tra hoặc cung cấp OTP.',
    signs: ['Số điện thoại lạ gọi tự xưng là công an', 'Yêu cầu chuyển tiền vào tài khoản "kiểm tra"', 'Đe dọa bắt giam nếu không hợp tác', 'Yêu cầu giữ bí mật, không nói với ai'],
    protect: ['Công an KHÔNG BAO GIỜ điều tra qua điện thoại', 'Không chuyển tiền theo yêu cầu qua điện thoại', 'Gọi lại cơ quan công an địa phương để xác minh', 'Báo ngay cho người thân khi nhận cuộc gọi lạ'],
    color: 'bg-danger/10 text-danger',
  },
  {
    id: 4, icon: <Brain className="w-8 h-8" />, title: 'Deepfake AI',
    desc: 'Tạo video/audio giả mạo bằng trí tuệ nhân tạo.',
    how: 'Sử dụng AI để mô phỏng khuôn mặt, giọng nói của người thân, người nổi tiếng. Gọi video yêu cầu chuyển khoản khẩn cấp với lý do tai nạn, bệnh tật. Tạo video giả người nổi tiếng quảng cáo đầu tư. Công nghệ deepfake ngày càng tinh vi, khó phân biệt bằng mắt thường.',
    signs: ['Video có chuyển động môi không tự nhiên', 'Ánh sáng trên khuôn mặt không đồng nhất', 'Giọng nói hơi robot, không có cảm xúc', 'Yêu cầu chuyển tiền gấp qua video call'],
    protect: ['Gọi lại trực tiếp cho người thân qua số quen', 'Đặt câu hỏi chỉ người thật mới biết', 'Không chuyển tiền khi chưa xác minh', 'Cập nhật kiến thức về deepfake'],
    color: 'bg-purple-500/10 text-purple-600',
  },
  {
    id: 5, icon: <TrendingUp className="w-8 h-8" />, title: 'Lừa đảo tài chính',
    desc: 'Đầu tư ảo, tiền ảo, ví điện tử giả.',
    how: 'Hứa hẹn lãi suất cao bất thường (20-50%/tháng), đầu tư không rủi ro. Mô hình Ponzi: trả lãi cho người trước bằng tiền người sau. Khi đủ nhiều người nạp tiền, sàn sập, người điều hành biến mất. Vụ Mr Pips lừa đảo hơn 5.200 tỷ đồng tại Việt Nam.',
    signs: ['Lãi suất quá cao so với thị trường', 'Không có giấy phép hoạt động rõ ràng', 'Yêu cầu nạp tiền trước để nhận lãi', 'Không rút được tiền với nhiều lý do'],
    protect: ['Không tin lợi nhuận phi thực tế', 'Kiểm tra giấy phép doanh nghiệp', 'Không nạp tiền vào sàn không uy tín', 'Tham khảo ý kiến chuyên gia tài chính'],
    color: 'bg-green-600/10 text-green-600',
  },
  {
    id: 6, icon: <Heart className="w-8 h-8" />, title: 'Lừa đảo tình cảm',
    desc: 'Romance Scam - xây dựng tình cảm để lừa đảo.',
    how: 'Kẻ lừa đảo (thường ở nước ngoàii) kết bạn qua mạng xã hội, app hẹn hò. Dành tháng trờii xây dựng mối quan hệ tình cảm. Sau đó đưa ra lý do khó khăn (bệnh tật, bị mắc kẹt ở sân bay, cần tiền phẫu thuật) để xin tiền. Nạn nhân thường là người cô đơn, người cao tuổi.',
    signs: ['Ngườii yêu chưa gặp mặt đã xin tiền', 'Có nhiều lý do không thể video call', 'Chuyển tiền qua nhiều tài khoản khác nhau', 'Quá hoàn hảo, quá nhanh trong tình cảm'],
    protect: ['Không chuyển tiền cho người chưa gặp mặt', 'Video call để xác minh danh tính', 'Tìm kiếm hình ảnh profile trên Google', 'Thận trọng với người quá hoàn hảo'],
    color: 'bg-pink-500/10 text-pink-600',
  },
];

const PSYCH_DETAILS = [
  { num: '01', title: 'LÒNG THAM', subtitle: 'Mong muốn giàu nhanh', icon: <Coins className="w-10 h-10" />, desc: 'Tin vào lợi nhuận phi thực tế, cam kết làm giàu nhanh chóng. Kẻ lừa đảo khai thác sự ham muốn tức thờii bằng các kịch bản "đầu tư sinh lợi cao", "việc nhẹ lương cao", trúng thưởng giá trị lớn. Ngay cả người thông minh cũng có thể mắc bẫy khi lòng tham che mờ lý trí.', solution: 'Không có bữa trưa miễn phí. Nếu nghe lợi nhuận quá tốt, hãy nghi ngờ ngay. Tra cứu thông tin đa chiều trước khi đầu tư.' },
  { num: '02', title: 'SỢ HÃI', subtitle: 'Tạo áp lực đe dọa', icon: <AlertTriangle className="w-10 h-10" />, desc: 'Bị dọa dẫm về hậu quả pháp lý, tài khoản ngân hàng bị khóa, hoặc người thân gặp nạn. Tạo tâm lý hoảng loạn khiến nạn nhân mất khả năng phán đoán, vội vàng làm theo hướng dẫn mà không kịp suy nghĩ.', solution: 'Bình tĩnh, hít thở sâu. Cơ quan pháp luật không bao giờ đe dọa qua điện thoại. Gọi lại cơ quan chính thức để xác minh.' },
  { num: '03', title: 'TÒ MÒ & HIẾU KỲ', subtitle: 'Sự kiện nóng, tài liệu hấp dẫn', icon: <Search className="w-10 h-10" />, desc: 'Lôi cuốn bằng thông tin bí mật, tệp đính kèm lạ, tin tức giật gân, hoặc hình ảnh nhạy cảm. Khơi dậy ham muốn khám phá khiến nạn nhân click vào link độc hại. "Xem ai đã xem profile của bạn" hoặc "File tài liệu mật" là những mồi nhử phổ biến.', solution: 'Không click link lạ, không tải file từ nguồn không xác định. Cài phần mềm antivirus và cập nhật thường xuyên.' },
  { num: '04', title: 'NHẸ DẠ CẢ TIN', subtitle: 'Dễ tin người, thiếu cảnh giác', icon: <UserX className="w-10 h-10" />, desc: 'Giả danh người thân, chuyên gia, cơ quan uy tín. Lợi dụng lòng tin và thói quen không kiểm chứng thông tin của nạn nhân. Đặc biệt người lớn tuổi và trẻ em là đối tượng dễ bị tận dụng vì thiếu kiến thức về công nghệ.', solution: 'Luôn kiểm chứng danh tính qua kênh chính thức. Không tin ngay cả những gì nghe từ người quen qua tin nhắn (tài khoản có thể bị hack).' },
  { num: '05', title: 'TÌNH CẢM & TÌNH THƯƠNG', subtitle: 'Đánh vào lòng thương hại', icon: <Heart className="w-10 h-10" />, desc: 'Tạo dựng kịch bản bi kịch, yêu cầu giúp đỡ khẩn cấp cho người thân hoặc cần tấn từ thiện giả mạo. Lợi dụng lòng nhân ái và sự đồng cảm. "Con tôi đang cấp cứu, cần tiền gấp" là kịch bản thường gặp.', solution: 'Gọi điện trực tiếp cho người liên quan để xác minh. Không chuyển tiền khi chỉ nhận được tin nhắn, dù từ người quen.' },
  { num: '06', title: 'CẢM GIÁC KHẨN CẤP', subtitle: 'Áp lực thờii gian', icon: <Clock className="w-10 h-10" />, desc: 'Yêu cầu hành động ngay lập tức: "cơ hội cuối cùng", "chỉ hôm nay", "24 giờ", "giá sẽ tăng sau 1 giờ". Ngăn cản nạn nhân suy nghĩ thấu đáo hoặc tham khảo ý kiến người khác. Đây là chiêu trò phổ biến nhất kết hợp với các yếu tố khác.', solution: 'Nguyên tắc vàng: CHẬM LẠI. Không quyết định gì khi đang bị ép buộc. Hãy dừng lại, thảo luận với người thân trước khi hành động.' },
];

/* ═══════════════════════════════════════════
   COUNTER COMPONENT
   ═══════════════════════════════════════════ */
function Counter({ end, suffix = '', duration = 2 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const trigger = ScrollTrigger.create({
      trigger: el, start: 'top 85%', once: true,
      onEnter: () => {
        gsap.to({ val: 0 }, {
          val: end, duration, ease: 'power2.out',
          onUpdate: function () { setCount(Math.round(this.targets()[0].val)); }
        });
      }
    });
    return () => trigger.kill();
  }, [end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

/* ═══════════════════════════════════════════
   FLOATING PARTICLES
   ═══════════════════════════════════════════ */
function FloatingParticles({ count = 20, color = '#C4882B' }: { count?: number; color?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animId: number;
    const particles: { x: number; y: number; r: number; dx: number; dy: number; o: number }[] = [];
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener('resize', resize);
    for (let i = 0; i < count; i++) {
      particles.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, r: Math.random() * 3 + 1, dx: (Math.random() - 0.5) * 0.5, dy: (Math.random() - 0.5) * 0.5, o: Math.random() * 0.3 + 0.1 });
    }
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => { p.x += p.dx; p.y += p.dy; if (p.x < 0 || p.x > canvas.width) p.dx *= -1; if (p.y < 0 || p.y > canvas.height) p.dy *= -1; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fillStyle = color; ctx.globalAlpha = p.o; ctx.fill(); });
      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(animate);
    };
    animate();
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, [count, color]);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

/* ═══════════════════════════════════════════
   HERO SECTION
   ═══════════════════════════════════════════ */
function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('.hero-title span', { y: 60, opacity: 0, duration: 0.8, stagger: 0.06 })
        .from('.hero-subtitle', { y: 30, opacity: 0, duration: 0.6 }, '-=0.3')
        .from('.hero-desc', { y: 20, opacity: 0, duration: 0.5 }, '-=0.2')
        .from('.hero-card', { scale: 0.8, opacity: 0, duration: 0.5, stagger: 0.1 }, '-=0.2')
        .from('.hero-image', { x: -80, opacity: 0, duration: 1 }, 0.3);
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden bg-cream">
      <FloatingParticles count={25} color="#C4882B" />
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-16 py-16 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="relative order-2 lg:order-1 hero-image">
            <div className="rounded-2xl overflow-hidden shadow-2xl lg:transform lg:-rotate-2 lg:hover:rotate-0 transition-all duration-700">
              <img src="/images/hero-hands.jpg" alt="Nhận diện lừa đảo" className="w-full h-auto object-cover" loading="eager" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/30 to-transparent" />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-amber text-white rounded-xl px-4 py-2 shadow-lg hidden sm:block" style={{ animation: 'bounce 3s infinite' }}>
              <p className="text-xl font-black">72.6%</p>
              <p className="text-[10px] opacity-90">lừa đảo tài chính</p>
            </div>
          </div>
          <div className="order-1 lg:order-2 space-y-5">
            <div className="hero-title">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-ink uppercase leading-[1.1] tracking-tight">
                <span className="inline-block">NHẬN</span>{' '}<span className="inline-block">DIỆN</span>{' '}<span className="inline-block text-amber">&</span>
                <br className="hidden sm:block" />
                <span className="inline-block">PHÒNG</span>{' '}<span className="inline-block">CHỐNG</span>
                <br className="hidden sm:block" />
                <span className="inline-block text-amber">LỪA</span>{' '}<span className="inline-block text-amber">ĐẢO</span>{' '}<span className="inline-block">TRỰC</span>{' '}<span className="inline-block">TUYẾN</span>
              </h1>
            </div>
            <p className="hero-subtitle text-base sm:text-lg lg:text-xl text-ink-light font-medium">
              Bảo vệ bản thân và cộng đồng trước các mối đe dọa trực tuyến
            </p>
            <p className="hero-desc text-sm text-ink-muted max-w-lg">
              Với 70 triệu người dùng Internet tại Việt Nam, lừa đảo trực tuyến đang là mối đe dọa nghiêm trọng.
              Hơn 7/10 vụ lừa đảo nhắm vào tài chính. Hãy trang bị kiến thức để bảo vệ chính mình.
            </p>
            <div className="grid grid-cols-2 gap-2 sm:gap-3 pt-2">
              {[
                { icon: <Eye className="w-5 h-5" />, text: 'NHẬN DIỆN MỐI ĐE DỌA' },
                { icon: <Key className="w-5 h-5" />, text: 'THIẾT LẬP HÀNG RÀO' },
                { icon: <ShieldCheck className="w-5 h-5" />, text: 'DUY TRÌ AN TOÀN' },
                { icon: <Zap className="w-5 h-5" />, text: 'HÀNH ĐỘNG NGAY' },
              ].map((item, i) => (
                <div key={i} className="hero-card bg-white rounded-xl p-3 sm:p-4 shadow-sm flex items-center gap-2 sm:gap-3 hover:shadow-md hover:-translate-y-1 transition-all border border-border cursor-default">
                  <span className="text-amber flex-shrink-0">{item.icon}</span>
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wide text-ink leading-tight">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   VIDEO SECTION
   ═══════════════════════════════════════════ */
// Mock components assuming they exist in your codebase
// import { FloatingParticles } from './FloatingParticles'; 

// export function VideoSection() {
//   const ref = useRef<HTMLElement>(null);
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const videoContainerRef = useRef<HTMLDivElement>(null);

//   // Video Player States
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [isMuted, setIsMuted] = useState(true);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [duration, setDuration] = useState(0);

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

//       tl.from('.hero-title span', { y: 60, opacity: 0, duration: 0.8, stagger: 0.06 })
//         .from('.hero-subtitle', { y: 30, opacity: 0, duration: 0.6 }, '-=0.3')
//         .from('.hero-desc', { y: 20, opacity: 0, duration: 0.5 }, '-=0.2')
//         .from('.hero-card', { scale: 0.8, opacity: 0, duration: 0.5, stagger: 0.1 }, '-=0.2')
//         .from('.hero-video-stage', { x: -80, opacity: 0, duration: 1 }, 0.3);
//     }, ref);

//     return () => ctx.revert();
//   }, []);

//   // Sync progress bar timeline updates
//   const handleTimeUpdate = () => {
//     if (videoRef.current) {
//       setCurrentTime(videoRef.current.currentTime);
//     }
//   };

//   const handleLoadedMetadata = () => {
//     if (videoRef.current) {
//       setDuration(videoRef.current.duration);
//     }
//   };

//   // Scrubber control click logic
//   const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (videoRef.current) {
//       const newTime = parseFloat(e.target.value);
//       videoRef.current.currentTime = newTime;
//       setCurrentTime(newTime);
//     }
//   };

//   const togglePlay = () => {
//     if (!videoRef.current) return;
//     if (isPlaying) {
//       videoRef.current.pause();
//     } else {
//       videoRef.current.play().catch(() => { });
//     }
//     setIsPlaying(!isPlaying);
//   };

//   const toggleMute = () => {
//     if (!videoRef.current) return;
//     videoRef.current.muted = !isMuted;
//     setIsMuted(!isMuted);
//   };

//   const toggleFullscreen = () => {
//     if (!videoContainerRef.current) return;

//     if (!document.fullscreenElement) {
//       videoContainerRef.current.requestFullscreen().catch((err) => {
//         console.error(`Error attempting to enable fullscreen: ${err.message}`);
//       });
//     } else {
//       document.exitFullscreen();
//     }
//   };

//   // Helper formatting utility (e.g., convert 75s to 01:15)
//   const formatTime = (timeInSeconds: number) => {
//     if (isNaN(timeInSeconds)) return '00:00';
//     const minutes = Math.floor(timeInSeconds / 60);
//     const seconds = Math.floor(timeInSeconds % 60);
//     return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
//   };

//   const blockSlideTrigger = (e: React.MouseEvent) => {
//     e.preventDefault();
//     e.stopPropagation(); // Kills the event cascade here
//   };

//   return (
//     <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden bg-cream">
//       <FloatingParticles count={25} color="#C4882B" />
//       <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-16 py-16 lg:py-0">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

//           {/* LEFT COLUMN: Updated Copy Context */}
//           <div className="order-1 lg:order-1 space-y-5">
//             <div className="hero-title">
//               <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-ink uppercase leading-[1.1] tracking-tight">
//                 <span className="inline-block">CẨM</span>{' '}<span className="inline-block">NANG</span>{' '}
//                 <br className="hidden sm:block" />
//                 <span className="inline-block text-indigo-500">AN TOÀN</span>{' '}<span className="inline-block text-indigo-500">SỐ</span>
//                 <br className="hidden sm:block" />
//                 <span className="inline-block">KỶ NGUYÊN</span>{' '}<span className="inline-block">MỚI</span>
//               </h1>
//             </div>

//             <p className="hero-subtitle text-base sm:text-lg lg:text-xl text-ink-light font-medium">
//               Xem video hướng dẫn xây dựng lá chắn bảo vệ danh tính trực tuyến
//             </p>

//             <p className="hero-desc text-sm text-ink-muted max-w-lg">
//               Không gian mạng mang lại nhiều giá trị nhưng cũng tiềm ẩn rủi ro lừa đảo công nghệ cao phức tạp.
//               Hãy dành 4 phút theo dõi video nhạc cùng giai điệu và hình ảnh trực quan về hiện thưc chuyển đổi số và các rủi ro tiềm ẩn.
//             </p>

//             <div className="grid grid-cols-2 gap-2 sm:gap-3 pt-2">
//               {[
//                 { icon: <Eye className="w-5 h-5" />, text: 'NHẬN DIỆN MỐI ĐE DỌA' },
//                 { icon: <Key className="w-5 h-5" />, text: 'THIẾT LẬP HÀNG RÀO' },
//                 { icon: <ShieldCheck className="w-5 h-5" />, text: 'DUY TRÌ AN TOÀN' },
//                 { icon: <Zap className="w-5 h-5" />, text: 'HÀNH ĐỘNG NGAY' },
//               ].map((item, i) => (
//                 <div key={i} className="hero-card bg-white rounded-xl p-3 sm:p-4 shadow-sm flex items-center gap-2 sm:gap-3 hover:shadow-md hover:-translate-y-1 transition-all border border-border cursor-default">
//                   <span className="text-amber flex-shrink-0">{item.icon}</span>
//                   <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wide text-ink leading-tight">{item.text}</span>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* RIGHT COLUMN: Advanced Video Stage */}
//           <div className="relative order-2 lg:order-2 hero-video-stage">
//             <div
//               ref={videoContainerRef}
//               className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-2xl bg-black group border border-border transition-all"
//               onClick={blockSlideTrigger}
//               onMouseDown={blockSlideTrigger}
//               onMouseUp={blockSlideTrigger}
//             >
//               <video
//                 ref={videoRef}
//                 src="https://github.com/piCreature99/online-safety-site/releases/download/v1.0.0/AnToanSo.webm"
//                 className="w-full h-full object-cover pointer-events-none z-50"
//                 // autoPlay
//                 loop
//                 muted
//                 playsInline
//                 onTimeUpdate={handleTimeUpdate}
//                 onLoadedMetadata={handleLoadedMetadata}
//               />

//               {/* Overlay HUD Layer */}
//               <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 z-10">

//                 {/* Header Sub-Badge */}
//                 <div className="flex justify-between items-start">
//                   <span className="bg-amber/95 backdrop-blur-sm text-white font-bold text-[10px] tracking-wider px-2.5 py-1 rounded-md uppercase">
//                     Chiến dịch An Toàn Số
//                   </span>
//                 </div>

//                 {/* Big Center Quick Play Toggle */}
//                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
//                   <button
//                     onClick={togglePlay}
//                     className="flex items-center justify-center w-14 h-14 rounded-full bg-amber text-white shadow-xl hover:scale-110 active:scale-95 transition-all duration-200"
//                   >
//                     {isPlaying ? <Pause className="w-6 h-6 fill-white" /> : <Play className="w-6 h-6 fill-white translate-x-0.5" />}
//                   </button>
//                 </div>

//                 {/* Lower Custom Media Control Dash */}
//                 <div className="w-full space-y-2.5 mt-auto">

//                   {/* Custom Progress Scrubber Bar */}
//                   <div className="flex items-center gap-3">
//                     <input
//                       type="range"
//                       min="0"
//                       max={duration || 100}
//                       value={currentTime}
//                       onChange={handleSeek}
//                       className="w-full h-1.5 bg-white/30 rounded-lg appearance-none cursor-pointer accent-amber focus:outline-none transition-colors"
//                       style={{
//                         background: `linear-gradient(to right, #C4882B 0%, #C4882B ${(currentTime / (duration || 1)) * 100}%, rgba(255,255,255,0.3) ${(currentTime / (duration || 1)) * 100}%, rgba(255,255,255,0.3) 100%)`
//                       }}
//                     />
//                   </div>

//                   {/* System Level Controls Panel */}
//                   <div className="flex items-center justify-between text-white">
//                     <div className="flex items-center gap-4">
//                       <button onClick={togglePlay} className="hover:text-amber transition-colors">
//                         {isPlaying ? <Pause className="w-5 h-5 fill-white" /> : <Play className="w-5 h-5 fill-white" />}
//                       </button>

//                       {/* VOLUME CONTROLLER GROUP */}
//                       <div className="flex items-center gap-2 group/volume">
//                         <button onClick={toggleMute} className="hover:text-amber transition-colors flex-shrink-0">
//                           {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
//                         </button>

//                         {/* Dynamic Volume Slider Bar */}
//                         <input
//                           type="range"
//                           min="0"
//                           max="1"
//                           step="0.05"
//                           value={isMuted ? 0 : videoRef.current?.volume ?? 1}
//                           onChange={(e) => {
//                             if (videoRef.current) {
//                               const val = parseFloat(e.target.value);
//                               videoRef.current.volume = val;
//                               videoRef.current.muted = val === 0;
//                               setIsMuted(val === 0);
//                             }
//                           }}
//                           className="w-0 opacity-0 group-hover/volume:w-16 group-hover/volume:opacity-100 focus:w-16 focus:opacity-100 h-1 bg-white/30 rounded-lg appearance-none cursor-pointer accent-amber transition-all duration-300 ease-out"
//                           style={{
//                             background: `linear-gradient(to right, #C4882B 0%, #C4882B ${(isMuted ? 0 : (videoRef.current?.volume ?? 1)) * 100}%, rgba(255,255,255,0.3) ${(isMuted ? 0 : (videoRef.current?.volume ?? 1)) * 100}%, rgba(255,255,255,0.3) 100%)`
//                           }}
//                         />
//                       </div>

//                       <div className="text-xs font-mono tracking-wide text-white/90">
//                         <span>{formatTime(currentTime)}</span>
//                         <span className="mx-1 text-white/40">/</span>
//                         <span>{formatTime(duration)}</span>
//                       </div>
//                     </div>

//                     <button onClick={toggleFullscreen} className="hover:text-amber transition-colors p-0.5">
//                       <Maximize className="w-5 h-5" />
//                     </button>
//                   </div>
//                 </div>

//               </div>
//             </div>

//             {/* floating Data Metric Badge */}
//             <div className="absolute transform rotate-6 -top-4 -right-4 shadow-lg">
//               <div className=" -top-4 -right-4 bg-indigo-500 text-white rounded-xl px-4 py-2 shadow-lg hidden sm:block animate-[bounce_3s_infinite] z-20">

//                 <p className="text-xl font-black">Music Video</p>
//                 {/* <p className="text-[10px] opacity-90">lừa đảo tài chính</p> */}
//               </div>
//             </div>
//           </div>



//         </div>
//       </div>
//     </section>
//   );
// }
export function VideoSection() {
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  // Video Player States
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // 🚀 SỬA LỖI 1: Tạo trạng thái phản xạ (reactive state) riêng cho âm lượng 
  // Tránh việc đọc trực tiếp thuộc tính biến đổi 'videoRef.current.volume' trong JSX
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from('.hero-title span', { y: 60, opacity: 0, duration: 0.8, stagger: 0.06 })
        .from('.hero-subtitle', { y: 30, opacity: 0, duration: 0.6 }, '-=0.3')
        .from('.hero-desc', { y: 20, opacity: 0, duration: 0.5 }, '-=0.2')
        .from('.hero-card', { scale: 0.8, opacity: 0, duration: 0.5, stagger: 0.1 }, '-=0.2')
        .from('.hero-video-stage', { x: -80, opacity: 0, duration: 1 }, 0.3);
    }, ref);

    return () => ctx.revert();
  }, []);

  // Đảm bảo trạng thái ban đầu của thẻ video đồng bộ với React State
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
      videoRef.current.volume = volume;
    }
  }, []);

  // Sync progress bar timeline updates
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  // Scrubber control click logic
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      const newTime = parseFloat(e.target.value);
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const togglePlay = (e?: React.MouseEvent) => {
    // Chặn đổi slide khi nhấn nút play lớn hoặc nút điều khiển nhỏ
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch(() => { });
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation(); // Cô lập sự kiện click chuột trái đổi slide
    }

    if (!videoRef.current) return;
    const nextMuteState = !isMuted;
    videoRef.current.muted = nextMuteState;
    setIsMuted(nextMuteState);

    // Nếu bỏ tắt tiếng khi thanh âm lượng đang ở đáy, đẩy nhẹ lên mức nghe được
    if (!nextMuteState && volume === 0) {
      videoRef.current.volume = 0.5;
      setVolume(0.5);
    }
  };

  const toggleFullscreen = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!videoContainerRef.current) return;

    if (!document.fullscreenElement) {
      videoContainerRef.current.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  const formatTime = (timeInSeconds: number) => {
    if (isNaN(timeInSeconds)) return '00:00';
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const blockSlideTrigger = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation(); // Tường lửa chặn đứng thác tác động lên khung slide cha
  };

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden bg-cream">
      {/* <FloatingParticles count={25} color="#C4882B" /> */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-16 py-16 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* LEFT COLUMN: Copy Context */}
          <div className="order-1 lg:order-1 space-y-5">
            <div className="hero-title">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-ink uppercase leading-[1.1] tracking-tight">
                <span className="inline-block">CẨM</span>{' '}<span className="inline-block">NANG</span>{' '}
                <br className="hidden sm:block" />
                <span className="inline-block text-indigo-500">AN TOÀN</span>{' '}<span className="inline-block text-indigo-500">SỐ</span>
                <br className="hidden sm:block" />
                <span className="inline-block">KỶ NGUYÊN</span>{' '}<span className="inline-block">MỚI</span>
              </h1>
            </div>

            <p className="hero-subtitle text-base sm:text-lg lg:text-xl text-ink-light font-medium">
              Xem video nhạc xây dựng lá chắn bảo vệ danh tính trực tuyến
            </p>

            <p className="hero-desc text-sm text-ink-muted max-w-lg">
              Không gian mạng mang lại nhiều giá trị nhưng cũng tiềm ẩn rủi ro lừa đảo công nghệ cao phức tạp.
              Hãy dành 4 phút theo dõi video nhạc cùng giai điệu và hình ảnh trực quan về hiện thưc chuyển đổi số và các rủi ro tiềm ẩn.
            </p>

            <div className="grid grid-cols-2 gap-2 sm:gap-3 pt-2">
              {[
                { icon: <Eye className="w-5 h-5" />, text: 'NHẬN DIỆN MỐI ĐE DỌA' },
                { icon: <Key className="w-5 h-5" />, text: 'THIẾT LẬP HÀNG RÀO' },
                { icon: <ShieldCheck className="w-5 h-5" />, text: 'DUY TRÌ AN TOÀN' },
                { icon: <Zap className="w-5 h-5" />, text: 'HÀNH ĐỘNG NGAY' },
              ].map((item, i) => (
                <div key={i} className="hero-card bg-white rounded-xl p-3 sm:p-4 shadow-sm flex items-center gap-2 sm:gap-3 hover:shadow-md hover:-translate-y-1 transition-all border border-border cursor-default">
                  <span className="text-amber flex-shrink-0">{item.icon}</span>
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wide text-ink leading-tight">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: Advanced Video Stage */}
          <div className="relative order-2 lg:order-2 hero-video-stage">
            <div
              ref={videoContainerRef}
              className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-2xl bg-black group border border-border transition-all"
              onClick={blockSlideTrigger}
              onMouseDown={blockSlideTrigger}
              onMouseUp={blockSlideTrigger}
            >
              <video
                ref={videoRef}
                src="https://github.com/piCreature99/online-safety-site/releases/download/v1.0.0/AnToanSo.webm"
                className="w-full h-full object-cover pointer-events-none z-50"
                loop
                muted={isMuted}
                playsInline
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
              />

              {/* Overlay HUD Layer */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 z-10">

                {/* Header Sub-Badge */}
                <div className="flex justify-between items-start">
                  <span className="bg-amber/95 backdrop-blur-sm text-white font-bold text-[10px] tracking-wider px-2.5 py-1 rounded-md uppercase">
                    Chiến dịch An Toàn Số
                  </span>
                </div>

                {/* Big Center Quick Play Toggle */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <button
                    type="button"
                    onClick={(e) => togglePlay(e)}
                    className="flex items-center justify-center w-14 h-14 rounded-full bg-amber text-white shadow-xl hover:scale-110 active:scale-95 transition-all duration-200"
                  >
                    {isPlaying ? <Pause className="w-6 h-6 fill-white" /> : <Play className="w-6 h-6 fill-white translate-x-0.5" />}
                  </button>
                </div>

                {/* Lower Custom Media Control Dash */}
                <div className="w-full space-y-2.5 mt-auto">

                  {/* Custom Progress Scrubber Bar */}
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min="0"
                      max={duration || 100}
                      value={currentTime}

                      // 🚀 SỬA LỖI: Cô lập hoàn toàn các sự kiện chuột tại thanh tiến độ
                      // Ngăn không cho khung div cha can thiệp vào hành vi kéo thả slider
                      onClick={(e) => e.stopPropagation()}
                      onMouseDown={(e) => e.stopPropagation()}
                      onMouseUp={(e) => e.stopPropagation()}

                      onChange={handleSeek}
                      className="w-full h-1.5 bg-white/30 rounded-lg appearance-none cursor-pointer accent-amber focus:outline-none transition-colors"
                      style={{
                        background: `linear-gradient(to right, #C4882B 0%, #C4882B ${(currentTime / (duration || 1)) * 100}%, rgba(255,255,255,0.3) ${(currentTime / (duration || 1)) * 100}%, rgba(255,255,255,0.3) 100%)`
                      }}
                    />
                  </div>

                  {/* System Level Controls Panel */}
                  <div className="flex items-center justify-between text-white">
                    <div className="flex items-center gap-4">
                      <button type="button" onClick={(e) => togglePlay(e)} className="hover:text-amber transition-colors">
                        {isPlaying ? <Pause className="w-5 h-5 fill-white" /> : <Play className="w-5 h-5 fill-white" />}
                      </button>

                      {/* VOLUME CONTROLLER GROUP */}
                      <div className="flex items-center gap-2 group/volume">
                        <button type="button" onClick={(e) => toggleMute(e)} className="hover:text-amber transition-colors flex-shrink-0">
                          {isMuted || volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                        </button>

                        {/* Dynamic Volume Slider Bar */}
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.05"
                          value={isMuted ? 0 : volume} // 🚀 Khớp nối thẳng vào state 'volume'
                          // 🚀 SỬA LỖI 3: Chặn đứng sự kiện nổi bọt kéo chuột của thanh âm lượng tại chỗ
                          onClick={(e) => e.stopPropagation()}
                          onMouseDown={(e) => e.stopPropagation()}
                          onMouseUp={(e) => e.stopPropagation()}
                          onChange={(e) => {
                            e.stopPropagation(); // Bảo vệ luồng dữ liệu thay đổi
                            if (videoRef.current) {
                              const val = parseFloat(e.target.value);
                              videoRef.current.volume = val;

                              const shouldMute = val === 0;
                              videoRef.current.muted = shouldMute;

                              setVolume(val);
                              setIsMuted(shouldMute);
                            }
                          }}
                          className="w-0 opacity-0 group-hover/volume:w-16 group-hover/volume:opacity-100 focus:w-16 focus:opacity-100 h-1 bg-white/30 rounded-lg appearance-none cursor-pointer accent-amber transition-all duration-300 ease-out"
                          style={{
                            background: `linear-gradient(to right, #C4882B 0%, #C4882B ${(isMuted ? 0 : volume) * 100}%, rgba(255,255,255,0.3) ${(isMuted ? 0 : volume) * 100}%, rgba(255,255,255,0.3) 100%)`
                          }}
                        />
                      </div>

                      <div className="text-xs font-mono tracking-wide text-white/90">
                        <span>{formatTime(currentTime)}</span>
                        <span className="mx-1 text-white/40">/</span>
                        <span>{formatTime(duration)}</span>
                      </div>
                    </div>

                    <button type="button" onClick={(e) => toggleFullscreen(e)} className="hover:text-amber transition-colors p-0.5">
                      <Maximize className="w-5 h-5" />
                    </button>
                  </div>
                </div>

              </div>
            </div>

            {/* Floating Data Metric Badge */}
            <div className="absolute transform rotate-6 -top-4 -right-4 shadow-lg">
              <div className="bg-indigo-500 text-white rounded-xl px-4 py-2 shadow-lg hidden sm:block animate-[bounce_3s_infinite] z-20">
                <p className="text-xl font-black">Music Video</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   SCENARIO VIDEO SECTION
   ═══════════════════════════════════════════ */

// export function ScenarioVideoSection() {
//   const sectionRef = useRef<HTMLElement>(null);
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const stageRef = useRef<HTMLDivElement>(null);

//   // Video States
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [isMuted, setIsMuted] = useState(true);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [duration, setDuration] = useState(0);

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

//       tl.from('.scenario-wing-left', { x: -40, opacity: 0, duration: 0.7 })
//         .from('.scenario-wing-right', { x: 40, opacity: 0, duration: 0.7 }, '-=0.5')
//         .from('.scenario-core-player', { y: 30, opacity: 0, duration: 0.8 }, '-=0.4');
//     }, sectionRef);

//     return () => ctx.revert();
//   }, []);

//   const handleTimeUpdate = () => {
//     if (videoRef.current) setCurrentTime(videoRef.current.currentTime);
//   };

//   const handleLoadedMetadata = () => {
//     if (videoRef.current) setDuration(videoRef.current.duration);
//   };

//   const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (videoRef.current) {
//       const newTime = parseFloat(e.target.value);
//       videoRef.current.currentTime = newTime;
//       setCurrentTime(newTime);
//     }
//   };

//   const togglePlay = () => {
//     if (!videoRef.current) return;
//     if (isPlaying) videoRef.current.pause();
//     else videoRef.current.play().catch(() => { });
//     setIsPlaying(!isPlaying);
//   };

//   const toggleMute = () => {
//     if (!videoRef.current) return;
//     videoRef.current.muted = !isMuted;
//     setIsMuted(!isMuted);
//   };

//   const toggleFullscreen = () => {
//     if (!stageRef.current) return;
//     if (!document.fullscreenElement) {
//       stageRef.current.requestFullscreen().catch(() => { });
//     } else {
//       document.exitFullscreen();
//     }
//   };

//   const formatTime = (time: number) => {
//     if (isNaN(time)) return '00:00';
//     const mins = Math.floor(time / 60);
//     const secs = Math.floor(time % 60);
//     return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
//   };

//   return (
//     <section ref={sectionRef} className="py-16 lg:py-24 bg-cream/30 overflow-hidden border-t border-border">
//       <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-16">

//         {/* 3-Column Split Dashboard Framework */}
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">

//           {/* LEFT WING: Scenario Context Details (3 Columns) */}
//           <div className="scenario-wing-left lg:col-span-3 space-y-4 lg:text-right Order-2 lg:order-1">
//             <div className="space-y-1">
//               <span className="text-[10px] font-bold tracking-widest text-red-600 uppercase bg-red-50 px-2 py-0.5 rounded inline-block">
//                 Tình huống thực tế
//               </span>
//               <h3 className="text-xl font-black text-ink uppercase tracking-tight leading-tight">
//                 Kịch bản thao túng <br className="hidden lg:block" /> & Dụ dỗ mạng
//               </h3>
//             </div>

//             <p className="text-xs text-ink-muted leading-relaxed">
//               Video mô phỏng cách thức các đối tượng ẩn danh tiếp cận, tạo dựng niềm tin giả tạo và thao túng tâm lý trẻ vị thành niên qua các nền tảng tin nhắn mật.
//             </p>

//             <div className="hidden lg:flex flex-col items-end gap-2 pt-2 border-t border-border text-[11px] text-ink-light">
//               <span className="flex items-center gap-1.5 font-bold text-red-600">
//                 <AlertTriangle className="w-3.5 h-3.5" /> DẤU HIỆU CẢNH BÁO
//               </span>
//               <span>• Yêu cầu giữ bí mật cuộc trò chuyện</span>
//               <span>• Tặng quà hoặc nạp thẻ game ẩn danh</span>
//             </div>
//           </div>

//           {/* CENTER WING: The Cinematic Scenario Media Player (6 Columns) */}
//           <div className="scenario-core-player lg:col-span-6 order-1 lg:order-2">
//             <div
//               ref={stageRef}
//               className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-2xl bg-black group border border-border"
//             >
//               <video
//                 ref={videoRef}
//                 src="https://github.com/piCreature99/online-safety-site/releases/download/v1.0.0/Scenario.webm"
//                 className="w-full h-full object-cover transform-gpu will-change-transform"
//                 // autoPlay
//                 loop
//                 muted
//                 playsInline
//                 onTimeUpdate={handleTimeUpdate}
//                 onLoadedMetadata={handleLoadedMetadata}
//               />

//               {/* Dynamic Overlay Interface */}
//               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 z-10">

//                 <div className="flex justify-between items-start">
//                   <span className="bg-red-600/90 backdrop-blur-sm text-white font-bold text-[9px] tracking-wider px-2 py-0.5 rounded uppercase flex items-center gap-1">
//                     <ShieldAlert className="w-3 h-3" /> Cảnh giác cao độ
//                   </span>
//                 </div>

//                 {/* Centered Play Control HUD */}
//                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
//                   <button
//                     onClick={togglePlay}
//                     className="flex items-center justify-center w-12 h-12 rounded-full bg-red-600 text-white shadow-xl hover:scale-110 active:scale-95 transition-all duration-200"
//                   >
//                     {isPlaying ? <Pause className="w-5 h-5 fill-white" /> : <Play className="w-5 h-5 fill-white translate-x-0.5" />}
//                   </button>
//                 </div>

//                 {/* Dashboard Control Rack */}
//                 <div className="w-full space-y-2 mt-auto">
//                   <input
//                     type="range"
//                     min="0"
//                     max={duration || 100}
//                     value={currentTime}
//                     onChange={handleSeek}
//                     className="w-full h-1 bg-white/30 rounded-lg appearance-none cursor-pointer accent-red-600 focus:outline-none transition-colors"
//                     style={{
//                       background: `linear-gradient(to right, #dc2626 0%, #dc2626 ${(currentTime / (duration || 1)) * 100}%, rgba(255,255,255,0.3) ${(currentTime / (duration || 1)) * 100}%, rgba(255,255,255,0.3) 100%)`
//                     }}
//                   />

//                   <div className="flex items-center justify-between text-white text-xs">
//                     <div className="flex items-center gap-4">
//                       <button onClick={togglePlay} className="hover:text-red-500 transition-colors">
//                         {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white" />}
//                       </button>

//                       {/* Volume Slider Assembly */}
//                       <div className="flex items-center gap-1.5 group/volume">
//                         <button onClick={toggleMute} className="hover:text-red-500 transition-colors">
//                           {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
//                         </button>
//                         <input
//                           type="range"
//                           min="0"
//                           max="1"
//                           step="0.05"
//                           value={isMuted ? 0 : videoRef.current?.volume ?? 1}
//                           onChange={(e) => {
//                             if (videoRef.current) {
//                               const val = parseFloat(e.target.value);
//                               videoRef.current.volume = val;
//                               videoRef.current.muted = val === 0;
//                               setIsMuted(val === 0);
//                             }
//                           }}
//                           className="w-0 opacity-0 group-hover/volume:w-12 group-hover/volume:opacity-100 focus:w-12 focus:opacity-100 h-1 bg-white/30 rounded-lg appearance-none cursor-pointer accent-red-600 transition-all duration-300"
//                         />
//                       </div>

//                       <div className="font-mono opacity-80 text-[11px]">
//                         {formatTime(currentTime)} / {formatTime(duration)}
//                       </div>
//                     </div>

//                     <button onClick={toggleFullscreen} className="hover:text-red-500 transition-colors">
//                       <Maximize className="w-4 h-4" />
//                     </button>
//                   </div>
//                 </div>

//               </div>
//             </div>
//           </div>

//           {/* RIGHT WING: Dynamic Safety Guidelines (3 Columns) */}
//           <div className="scenario-wing-right lg:col-span-3 space-y-4 order-3">
//             <div className="space-y-1">
//               <span className="text-[10px] font-bold tracking-widest text-emerald-600 uppercase bg-emerald-50 px-2 py-0.5 rounded inline-block">
//                 Giải pháp bảo vệ
//               </span>
//               <h3 className="text-xl font-black text-ink uppercase tracking-tight leading-tight">
//                 Xây dựng <br className="hidden lg:block" /> Nguyên tắc ứng xử
//               </h3>
//             </div>

//             <p className="text-xs text-ink-muted leading-relaxed">
//               Chủ động trang bị cho bản thân và con trẻ bộ quy tắc ứng xử: Xác thực danh tính người lạ, tuyệt đối không chia sẻ vị trí hoặc hình ảnh nhạy cảm.
//             </p>

//             <div className="hidden lg:flex flex-col items-start gap-2 pt-2 border-t border-border text-[11px] text-ink-light">
//               <span className="flex items-center gap-1.5 font-bold text-emerald-600">
//                 <Heart className="w-3.5 h-3.5" /> HÀNH ĐỘNG BẢO VỆ
//               </span>
//               <span>• Thiết lập chế độ riêng tư tối đa</span>
//               <span>• Chia sẻ ngay với người thân khi nghi ngờ</span>
//             </div>
//           </div>

//         </div>

//         {/* Minimal Bottom Banner for Context */}
//         <div className="mt-8 pt-4 border-t border-border/60 flex items-center gap-2 text-ink-muted text-[11px] justify-center">
//           <Info className="w-3.5 h-3.5 text-amber" />
//           <span>Chiến dịch giáo dục cộng đồng về Phòng chống Xâm hại & Bắt cóc Trẻ em trên Không gian mạng.</span>
//         </div>

//       </div>
//     </section>
//   );
// }
export function ScenarioVideoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  // Video States
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // 🚀 ĐỒNG BỘ FIX 1: Thêm reactive state cho volume để quản lý render màu thanh trượt
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from('.scenario-wing-left', { x: -40, opacity: 0, duration: 0.7 })
        .from('.scenario-wing-right', { x: 40, opacity: 0, duration: 0.7 }, '-=0.5')
        .from('.scenario-core-player', { y: 30, opacity: 0, duration: 0.8 }, '-=0.4');
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Đồng bộ cấu hình âm thanh ban đầu cho thẻ video từ state
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
      videoRef.current.volume = volume;
    }
  }, []);

  const handleTimeUpdate = () => {
    if (videoRef.current) setCurrentTime(videoRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) setDuration(videoRef.current.duration);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      const newTime = parseFloat(e.target.value);
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const togglePlay = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation(); // Chặn đổi slide lớp cha khi tương tác nút phát
    }
    if (!videoRef.current) return;
    if (isPlaying) videoRef.current.pause();
    else videoRef.current.play().catch(() => { });
    setIsPlaying(!isPlaying);
  };

  const toggleMute = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation(); // Chặn đổi slide lớp cha khi nhấn nút âm lượng
    }
    if (!videoRef.current) return;
    const nextMuteState = !isMuted;
    videoRef.current.muted = nextMuteState;
    setIsMuted(nextMuteState);

    if (!nextMuteState && volume === 0) {
      videoRef.current.volume = 0.5;
      setVolume(0.5);
    }
  };

  const toggleFullscreen = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation(); // Chặn đổi slide lớp cha khi bật toàn màn hình
    if (!stageRef.current) return;
    if (!document.fullscreenElement) {
      stageRef.current.requestFullscreen().catch(() => { });
    } else {
      document.exitFullscreen();
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return '00:00';
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const blockSlideTrigger = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation(); // Lớp lá chắn bảo vệ bao bọc toàn bộ khung trình phát video
  };

  return (
    <section ref={sectionRef} className="py-16 lg:py-24 bg-cream/30 overflow-hidden border-t border-border">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-16">

        {/* 3-Column Split Dashboard Framework */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">

          {/* LEFT WING: Scenario Context Details (3 Columns) */}
          <div className="scenario-wing-left lg:col-span-3 space-y-4 lg:text-right order-2 lg:order-1">
            <div className="space-y-1">
              <span className="text-[10px] font-bold tracking-widest text-red-600 uppercase bg-red-50 px-2 py-0.5 rounded inline-block">
                Tình huống thực tế
              </span>
              <h3 className="text-xl font-black text-ink uppercase tracking-tight leading-tight">
                Kịch bản thao túng <br className="hidden lg:block" /> & Dụ dỗ mạng
              </h3>
            </div>

            <p className="text-xs text-ink-muted leading-relaxed">
              Video mô phỏng cách thức các đối tượng ẩn danh tiếp cận, tạo dựng niềm tin giả tạo và thao túng tâm lý trẻ vị thành niên qua các nền tảng tin nhắn mật.
            </p>

            <div className="hidden lg:flex flex-col items-end gap-2 pt-2 border-t border-border text-[11px] text-ink-light">
              <span className="flex items-center gap-1.5 font-bold text-red-600">
                <AlertTriangle className="w-3.5 h-3.5" /> DẤU HIỆU CẢNH BÁO
              </span>
              <span>• Yêu cầu giữ bí mật cuộc trò chuyện</span>
              <span>• Tặng quà hoặc nạp thẻ game ẩn danh</span>
            </div>
          </div>

          {/* CENTER WING: The Cinematic Scenario Media Player (6 Columns) */}
          <div className="scenario-core-player lg:col-span-6 order-1 lg:order-2">
            <div
              ref={stageRef}
              className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-2xl bg-black group border border-border"
              onClick={blockSlideTrigger}
              onMouseDown={blockSlideTrigger}
              onMouseUp={blockSlideTrigger}
            >
              <video
                ref={videoRef}
                src="https://github.com/piCreature99/online-safety-site/releases/download/v1.0.0/Scenario.webm"
                className="w-full h-full object-cover transform-gpu will-change-transform pointer-events-none"
                loop
                muted={isMuted}
                playsInline
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
              />

              {/* Dynamic Overlay Interface */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 z-10">

                <div className="flex justify-between items-start">
                  <span className="bg-red-600/90 backdrop-blur-sm text-white font-bold text-[9px] tracking-wider px-2 py-0.5 rounded uppercase flex items-center gap-1">
                    <ShieldAlert className="w-3 h-3" /> Cảnh giác cao độ
                  </span>
                </div>

                {/* Centered Play Control HUD */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <button
                    type="button"
                    onClick={(e) => togglePlay(e)}
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-red-600 text-white shadow-xl hover:scale-110 active:scale-95 transition-all duration-200"
                  >
                    {isPlaying ? <Pause className="w-5 h-5 fill-white" /> : <Play className="w-5 h-5 fill-white translate-x-0.5" />}
                  </button>
                </div>

                {/* Dashboard Control Rack */}
                <div className="w-full space-y-2 mt-auto">

                  {/* Custom Progress Scrubber Bar */}
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min="0"
                      max={duration || 100}
                      value={currentTime}
                      // 🚀 ĐỒNG BỘ FIX 2: Cô lập hoàn toàn chuỗi sự kiện chuột trên thanh tiến độ nhạc
                      onClick={(e) => e.stopPropagation()}
                      onMouseDown={(e) => e.stopPropagation()}
                      onMouseUp={(e) => e.stopPropagation()}
                      onChange={handleSeek}
                      className="w-full h-1 bg-white/30 rounded-lg appearance-none cursor-pointer accent-red-600 focus:outline-none transition-colors"
                      style={{
                        background: `linear-gradient(to right, #dc2626 0%, #dc2626 ${(currentTime / (duration || 1)) * 100}%, rgba(255,255,255,0.3) ${(currentTime / (duration || 1)) * 100}%, rgba(255,255,255,0.3) 100%)`
                      }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-white text-xs">
                    <div className="flex items-center gap-4">
                      <button type="button" onClick={(e) => togglePlay(e)} className="hover:text-red-500 transition-colors">
                        {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white" />}
                      </button>

                      {/* Volume Slider Assembly */}
                      <div className="flex items-center gap-1.5 group/volume">
                        <button type="button" onClick={(e) => toggleMute(e)} className="hover:text-red-500 transition-colors">
                          {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                        </button>
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.05"
                          value={isMuted ? 0 : volume} // Kết nối trực tiếp vào React state
                          // 🚀 ĐỒNG BỘ FIX 3: Cô lập toàn bộ sự kiện sủi bọt chuột trên thanh kéo âm lượng
                          onClick={(e) => e.stopPropagation()}
                          onMouseDown={(e) => e.stopPropagation()}
                          onMouseUp={(e) => e.stopPropagation()}
                          onChange={(e) => {
                            e.stopPropagation();
                            if (videoRef.current) {
                              const val = parseFloat(e.target.value);
                              videoRef.current.volume = val;

                              const shouldMute = val === 0;
                              videoRef.current.muted = shouldMute;

                              setVolume(val);
                              setIsMuted(shouldMute);
                            }
                          }}
                          className="w-0 opacity-0 group-hover/volume:w-12 group-hover/volume:opacity-100 focus:w-12 focus:opacity-100 h-1 bg-white/30 rounded-lg appearance-none cursor-pointer accent-red-600 transition-all duration-300"
                          style={{
                            background: `linear-gradient(to right, #dc2626 0%, #dc2626 ${(isMuted ? 0 : volume) * 100}%, rgba(255,255,255,0.3) ${(isMuted ? 0 : volume) * 100}%, rgba(255,255,255,0.3) 100%)`
                          }}
                        />
                      </div>

                      <div className="font-mono opacity-80 text-[11px]">
                        {formatTime(currentTime)} / {formatTime(duration)}
                      </div>
                    </div>

                    <button type="button" onClick={(e) => toggleFullscreen(e)} className="hover:text-red-500 transition-colors">
                      <Maximize className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* RIGHT WING: Dynamic Safety Guidelines (3 Columns) */}
          <div className="scenario-wing-right lg:col-span-3 space-y-4 order-3">
            <div className="space-y-1">
              <span className="text-[10px] font-bold tracking-widest text-emerald-600 uppercase bg-emerald-50 px-2 py-0.5 rounded inline-block">
                Giải pháp bảo vệ
              </span>
              <h3 className="text-xl font-black text-ink uppercase tracking-tight leading-tight">
                Xây dựng <br className="hidden lg:block" /> Nguyên tắc ứng xử
              </h3>
            </div>

            <p className="text-xs text-ink-muted leading-relaxed">
              Chủ động trang bị cho bản thân và con trẻ bộ quy tắc ứng xử: Xác thực danh tính người lạ, tuyệt đối không chia sẻ vị trí hoặc hình ảnh nhạy cảm.
            </p>

            <div className="hidden lg:flex flex-col items-start gap-2 pt-2 border-t border-border text-[11px] text-ink-light">
              <span className="flex items-center gap-1.5 font-bold text-emerald-600">
                <Heart className="w-3.5 h-3.5" /> HÀNH ĐỘNG BẢO VỆ
              </span>
              <span>• Thiết lập chế độ riêng tư tối đa</span>
              <span>• Chia sẻ ngay với người thân khi nghi ngờ</span>
            </div>
          </div>

        </div>

        {/* Minimal Bottom Banner for Context */}
        <div className="mt-8 pt-4 border-t border-border/60 flex items-center gap-2 text-ink-muted text-[11px] justify-center">
          <Info className="w-3.5 h-3.5 text-amber" />
          <span>Chiến dịch giáo dục cộng đồng về Phòng chống Xâm hại & Bắt cóc Trẻ em trên Không gian mạng.</span>
        </div>

      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   POSTER SECTION
   ═══════════════════════════════════════════ */

export function PosterSection() {
  const containerRef = useRef<HTMLElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from('.poster-heading', { y: 30, opacity: 0, duration: 0.6 })
        .from('.poster-sub', { y: 20, opacity: 0, duration: 0.5 }, '-=0.3')
        .from('.poster-frame', { scale: 0.95, opacity: 0, duration: 0.8 }, '-=0.2');
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const posterSrc = "/images/poster3.png"; // Path to your asset

  return (
    <section ref={containerRef} className="py-12 lg:py-20 bg-cream overflow-hidden border-t border-border">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-16">

        {/* Asymmetric Structural Grid: 12-columns optimized for extreme image scale */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* MINIMALIST TEXT COLUMN (Occupies only 3 out of 12 columns on desktop) */}
          <div className="lg:col-span-3 space-y-4 lg:sticky lg:top-10">
            <div className="space-y-2">
              <span className="text-[10px] font-bold tracking-widest text-amber uppercase bg-amber/10 px-2.5 py-1 rounded-md inline-block">
                Tài liệu Truyền thông
              </span>
              <h2 className="poster-heading text-2xl sm:text-3xl font-black text-ink uppercase leading-tight tracking-tight">
                Phòng Chống <br /> Bắt Cóc ONLINE
              </h2>
            </div>

            <p className="poster-sub text-xs text-ink-muted leading-relaxed max-w-sm lg:max-w-none">
              Hình ảnh infographic tóm tắt các nguyên tắc vàng giúp cảnh giác, nhận diện hình thức giả mạo và phòng tránh dụ dỗ, thao túng tâm lý.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row lg:flex-col gap-2">
              <button
                onClick={() => setIsOpen(true)}
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-border border border-border text-ink text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-sm group"
              >
                <Maximize2 className="w-3.5 h-3.5 text-amber group-hover:scale-110 transition-transform" />
                XEM TOÀN MÀN HÌNH
              </button>

              <a
                href={posterSrc}
                download="Cam-Nang-An-Toan-So.jpg"
                className="inline-flex items-center justify-center gap-2 bg-amber hover:bg-amber/90 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                TẢI XUỐNG BẢN IN
              </a>
            </div>
          </div>

          {/* MAXIMUM SCALE IMAGE COLUMN (Occupies 9 out of 12 columns on desktop) */}
          <div className="lg:col-span-9 poster-frame">
            <div
              onClick={() => setIsOpen(true)}
              className="relative rounded-2xl overflow-hidden shadow-xl bg-white border border-border cursor-zoom-in group transition-all duration-500 hover:shadow-2xl"
            >
              <img
                src={posterSrc}
                alt="Cẩm nang nhận diện An toàn số"
                className="w-full h-auto object-contain max-h-[75vh] lg:max-h-[85vh] mx-auto transition-transform duration-700 group-hover:scale-[1.01]"
                loading="lazy"
              />

              {/* Subtle visual hover curtain indicator */}
              <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/5 transition-colors duration-300 flex items-center justify-center">
                <div className="bg-ink/80 backdrop-blur-sm text-white px-4 py-2 rounded-xl flex items-center gap-2 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
                  <Maximize2 className="w-4 h-4 text-amber" />
                  Phóng to ấn phẩm
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* LIGHTBOX MODAL CONTAINER (Radix UI Primitive Integration) */}
      <Dialog2.Root open={isOpen} onOpenChange={setIsOpen}>
        <Dialog2.Portal>

          {/* Backdrop Shadow Backdrop Overlay */}
          <Dialog2.Overlay className="fixed inset-0 bg-ink/80 backdrop-blur-md z-50 data-[state=open]:animate-fade-in" />

          {/* Content Stage Frame Box Wrapper */}
          <Dialog2.Content className="fixed inset-4 sm:inset-6 md:inset-10 z-50 flex items-center justify-center outline-none focus:outline-none">
            <div className="relative max-w-full max-h-full flex flex-col bg-white rounded-2xl shadow-2xl p-2 md:p-3 overflow-hidden animate-in fade-in zoom-in-95 duration-200">

              {/* Floating Frame Title Hook for Accessibility */}
              <Dialog2.Title className="sr-only">
                Chi tiết Cẩm nang An toàn số
              </Dialog2.Title>

              {/* Close Button Trigger */}
              <Dialog2.Close className="absolute top-4 right-4 bg-ink/80 hover:bg-ink text-white rounded-full p-2 shadow-md hover:scale-105 active:scale-95 transition-all z-10 focus:outline-none">
                <X className="w-5 h-5" />
              </Dialog2.Close>

              {/* High-Resolution Modal Poster Frame rendering inside bounds */}
              <div className="overflow-auto rounded-xl bg-cream/50">
                <img
                  src={posterSrc}
                  alt="Bản phóng to Cẩm nang nhận diện An toàn số"
                  className="w-auto h-auto max-w-full max-h-[85vh] sm:max-h-[88vh] object-contain mx-auto"
                />
              </div>

              {/* Mini Modal Footer Information */}
              <div className="px-3 py-2 flex items-center justify-between border-t border-border mt-2 text-ink-muted text-[10px] sm:text-xs">
                <div className="flex items-center gap-1.5 font-medium text-ink">
                  <ShieldCheck className="w-4 h-4 text-amber" />
                  Đọc kỹ hướng dẫn để tránh sập bẫy các kịch bản lừa đảo mạng
                </div>
                <a
                  href={posterSrc}
                  download
                  className="text-amber font-bold hover:underline"
                >
                  Tải file ảnh gốc
                </a>
              </div>

            </div>
          </Dialog2.Content>
        </Dialog2.Portal>
      </Dialog2.Root>
    </section>
  );
}

/* ═══════════════════════════════════════════
   STATS SECTION
   ═══════════════════════════════════════════ */
function StatsSection() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.stats-img', { x: -60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 75%' } });
      gsap.fromTo('.stat-box', { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 75%' } });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative py-16 sm:py-20 bg-cream overflow-hidden">
      <FloatingParticles count={15} color="#B87333" />
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10 items-center">
          <div className="lg:col-span-2 stats-img">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img src="/images/stats-silhouette.jpg" alt="Bức tranh lừa đảo" className="w-full h-auto object-cover" loading="lazy" />
            </div>
          </div>
          <div className="lg:col-span-3 space-y-4">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-ink uppercase leading-tight">
              BỨC TRANH LỪA ĐẢO TRỰC TUYẾN TẠI VIỆT NAM
            </h2>
            <p className="text-ink-light text-sm">
              Việt Nam có gần 100 triệu dân với ~70 triệu người sử dụng Internet. Đây là môi trường tiềm năng cho các đối tượng lừa đảo hoạt động.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="stat-box bg-white rounded-2xl p-5 shadow-sm border border-border">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="w-5 h-5 text-amber" />
                  <span className="text-xs font-bold text-copper uppercase">Quy mô và kết nối</span>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-ink-light">Dân số: <span className="text-xl font-black text-ink ml-1"><Counter end={100} /> triệu</span></p>
                  <p className="text-sm text-ink-light">Internet: <span className="text-xl font-black text-amber ml-1"><Counter end={70} /> triệu</span></p>
                </div>
              </div>
              <div className="stat-box bg-white rounded-2xl p-5 shadow-sm border border-border">
                <div className="flex items-center gap-2 mb-3">
                  <Target className="w-5 h-5 text-danger" />
                  <span className="text-xs font-bold text-copper uppercase">Mục tiêu lừa đảo</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="relative w-20 h-20 flex-shrink-0">
                    <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                      <circle cx="18" cy="18" r="15" fill="none" stroke="#E8D5C4" strokeWidth="3" />
                      <circle cx="18" cy="18" r="15" fill="none" stroke="#C4882B" strokeWidth="3" strokeDasharray={`${72.6 * 94.2 / 100} ${94.2 - 72.6 * 94.2 / 100}`} strokeLinecap="round" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-sm font-black text-amber">72.6%</span>
                    </div>
                  </div>
                  <div className="text-sm">
                    <p className="font-bold text-ink">Nhắm vào <span className="text-amber">tài chính</span></p>
                    <p className="text-ink-muted text-xs mt-1">27.4% là các dạng khác</p>
                  </div>
                </div>
              </div>
              <div className="stat-box bg-ink text-white rounded-2xl p-5 shadow-lg sm:col-span-2">
                <div className="flex items-start gap-3">
                  <AlertOctagon className="w-7 h-7 text-amber flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xl sm:text-2xl font-black uppercase leading-tight">
                      HƠN 7/10 VỤ LỪA ĐẢO LÀ CHIẾM ĐOẠT TÀI SẢN
                    </p>
                    <p className="text-white/70 text-sm mt-2 leading-relaxed">
                      Các dạng lừa đảo khác như tình cảm, đầu tư, việc làm... phần lớn chỉ là bước đệm dẫn đến mục tiêu cuối cùng: <span className="text-amber font-semibold">chiếm đoạt tài chính</span>.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   FRAUD TYPES - WITH DIALOG
   ═══════════════════════════════════════════ */
function FraudTypesSection() {
  const ref = useRef<HTMLElement>(null);
  const [openDetail, setOpenDetail] = useState<number | null>(null);
  const active = FRAUD_DETAILS.find(f => f.id === openDetail);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.fraud-card', { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 75%' } });
      gsap.fromTo('.fraud-img', { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 75%' } });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="py-16 sm:py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-16">
        <div className="text-center mb-10">
          <span className="inline-block bg-amber/10 text-amber text-xs font-bold uppercase px-4 py-2 rounded-full mb-3">Phân loại</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-ink">Các hình thức lừa đảo phổ biến</h2>
          <p className="text-ink-light mt-3 max-w-2xl mx-auto text-sm">
            Lừa đảo trực tuyến ngày càng đa dạng. <span className="text-amber font-semibold">Click vào từng thẻ</span> để xem chi tiết cách nhận biết và phòng tránh.
          </p>
        </div>

        {/* Illustration image for desktop */}
        <div className="fraud-img mb-8 rounded-2xl overflow-hidden shadow-md hidden lg:block">
          <img src="/images/fraud-types-illustration.jpg" alt="6 hình thức lừa đảo" className="w-full h-48 object-cover" loading="lazy" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {FRAUD_DETAILS.map((item) => (
            <button
              key={item.id}
              onClick={() => setOpenDetail(item.id)}
              className="fraud-card bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-border hover:shadow-lg hover:-translate-y-2 transition-all duration-300 group text-left cursor-pointer"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  {item.icon}
                </div>
                <div>
                  <span className="text-xs font-bold text-ink-muted">#{item.id}</span>
                  <h3 className="font-bold text-base sm:text-lg text-ink">{item.title}</h3>
                </div>
              </div>
              <p className="text-sm text-copper font-medium mb-3">{item.desc}</p>
              <div className="flex items-center gap-2 text-amber text-xs font-semibold">
                <Info className="w-4 h-4" />
                <span>Click xem chi tiết</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Detail Dialog */}
      <Dialog open={openDetail !== null} onOpenChange={() => setOpenDetail(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-cream border-border">
          {active && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl ${active.color} flex items-center justify-center`}>{active.icon}</div>
                  <div>
                    <DialogTitle className="text-xl font-black text-ink">{active.title}</DialogTitle>
                    <DialogDescription className="text-copper font-medium">{active.desc}</DialogDescription>
                  </div>
                </div>
              </DialogHeader>
              <div className="space-y-5 mt-4">
                <div>
                  <h4 className="font-bold text-sm uppercase text-ink mb-2 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-danger" /> Thủ đoạn
                  </h4>
                  <p className="text-sm text-ink-light leading-relaxed">{active.how}</p>
                </div>
                <div>
                  <h4 className="font-bold text-sm uppercase text-ink mb-2 flex items-center gap-2">
                    <Search className="w-4 h-4 text-amber" /> Dấu hiệu nhận biết
                  </h4>
                  <ul className="space-y-2">
                    {active.signs.map((s, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-ink-light">
                        <XCircle className="w-4 h-4 text-danger flex-shrink-0 mt-0.5" />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-sm uppercase text-ink mb-2 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-success" /> Cách phòng tránh
                  </h4>
                  <ul className="space-y-2">
                    {active.protect.map((p, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-ink-light">
                        <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
// export function FraudScenariosAccordion() {
//   const containerRef = useRef<HTMLElement>(null);

//   useEffect(() => {
//     // Hiệu ứng load-in ban đầu cho các thanh tiêu đề nhóm
//     const ctx = gsap.context(() => {
//       gsap.from('.group-trigger-bar', {
//         y: 25,
//         opacity: 0,
//         duration: 0.6,
//         stagger: 0.15,
//         ease: 'power3.out'
//       });
//     }, containerRef);

//     return () => ctx.revert();
//   }, []);

//   // Kích hoạt hiệu ứng GSAP cho các Card bên trong khi mở rộng Section
//   const handleSectionOpen = (value: string | string[]) => {
//     if (!value) return;

//     setTimeout(() => {
//       // Tìm lưới thẻ bên trong mục vừa được mở rộng
//       const activeGrid = document.querySelector(`[data-state="open"] .scams-card-grid`);
//       if (activeGrid) {
//         gsap.fromTo(activeGrid.children,
//           { y: 20, opacity: 0 },
//           { y: 0, opacity: 1, duration: 0.4, stagger: 0.06, ease: 'power2.out', overwrite: 'auto' }
//         );
//       }
//     }, 10); // Micro-delay để Radix kịp render thuộc tính DOM
//   };

// const fraudGroups = [
//   {
//     id: "group-1",
//     title: "NHÓM 1: TẤN CÔNG TRỰC TIẾP QUA NGHE - NHÌN",
//     description: "Những hình thức thao túng trực diện bằng giọng nói, hình ảnh công nghệ cao để ép buộc nạn nhân chuyển tiền gấp hoặc dụ dỗ sập bẫy.",
//     cards: [
//       {
//         title: "Cuộc gọi trực tiếp (Vishing)",
//         icon: <Phone className="w-4 h-4 text-red-600" />,
//         details: [
//           { label: "Kịch bản", desc: "Giả mạo Công an, Viện kiểm sát thông báo dính líu vụ án, hoặc đóng vai người thân vay tiền gấp." },
//           { label: "Dấu hiệu", desc: "Tạo áp lực khẩn cấp, yêu cầu chuyển khoản ngay hoặc ép nhập cú pháp đổi eSIM chiếm số điện thoại." }
//         ]
//       },
//       {
//         title: "Bẫy Mạng xã hội",
//         icon: <Share2 className="w-4 h-4 text-amber" />,
//         details: [
//           { label: "Kịch bản", desc: "Người lạ kết bạn bằng ảnh đại diện bắt mắt tạo lòng tin, rủ vào hội nhóm đầu tư, làm nhiệm vụ kiếm tiền." },
//           { label: "Dấu hiệu", desc: "Gắn mác 'đầu tư ít, lợi nhuận cao', quảng cáo tuyển dụng 'việc nhẹ lương cao' hoặc dịch vụ lấy lại tiền bị lừa." }
//         ]
//       },
//       {
//         title: "Cuộc gọi Deepfake AI",
//         icon: <Video className="w-4 h-4 text-red-600" />,
//         details: [
//           { label: "Kịch bản", desc: "Sử dụng trí tuệ nhân tạo (AI) sao chép gương mặt và giọng nói của người thân, bạn bè để gọi video." },
//           { label: "Dấu hiệu", desc: "Cuộc gọi mờ, chập chờn, giả vờ sóng yếu để yêu cầu chuyển tiền cứu trợ khẩn cấp vào tài khoản lạ." }
//         ]
//       }
//     ]
//   },
//   {
//     id: "group-2",
//     title: "NHÓM 2: KỸ THUẬT SỐ QUA VĂN BẢN VÀ ĐƯỜNG LINK",
//     description: "Tấn công phi kỹ thuật thông qua tin nhắn và email giả mạo, dẫn dụ cài đặt mã độc để chiếm quyền điều khiển thiết bị từ xa.",
//     cards: [
//       {
//         title: "Tin nhắn SMS & Email Phishing",
//         icon: <Mail className="w-4 h-4 text-amber" />,
//         details: [
//           { label: "Kịch bản", desc: "Gửi Email/SMS giả mạo ngân hàng hoặc tổ chức thông báo tài khoản bị khóa, đóng băng." },
//           { label: "Dấu hiệu", desc: "Email sai chính tả, chứa link lạ hoặc link rút gọn yêu cầu nhấp vào để xác thực khẩn cấp." }
//         ]
//       },
//       {
//         title: "Website Giả mạo",
//         icon: <Globe className="w-4 h-4 text-red-600" />,
//         details: [
//           { label: "Kịch bản", desc: "Sao chép 99% giao diện đăng nhập hoặc thanh toán của ngân hàng, ví điện tử, cơ quan nhà nước." },
//           { label: "Dấu hiệu", desc: "Tên miền (URL) có ký tự lạ, thừa thiếu chữ, không có chứng chỉ bảo mật SSL (biểu tượng ổ khóa)." }
//         ]
//       },
//       {
//         title: "Phần mềm & Tệp mã độc",
//         icon: <FileCode className="w-4 h-4 text-red-600" />,
//         details: [
//           { label: "Kịch bản", desc: "Lừa nạn nhân cài đặt app dịch vụ công giả mạo hoặc bấm vào file đính kèm chứa mã độc (.exe, .apk, .zip)." },
//           { label: "Dấu hiệu", desc: "Yêu cầu cấp quyền Accessibility (Trợ năng) trên điện thoại để âm thầm chiếm quyền điều khiển tài khoản ngân hàng." }
//         ]
//       }
//     ]
//   },
//   {
//     id: "group-3",
//     title: "NHÓM 3: ĐÁNH THẲNG VÀO ĐỜI SỐNG - BẪY TÂM LÝ",
//     description: "Lợi dụng lòng tin, nhu cầu tài chính và thói quen mua sắm của nạn nhân để thực hiện các hành vi lừa đảo chiếm đoạt tài sản.",
//     cards: [
//       {
//         title: "Thao túng Tình cảm & Đầu tư",
//         icon: <Heart className="w-4 h-4 text-red-600" />,
//         details: [
//           { label: "Kịch bản", desc: "Tạo mối quan hệ yêu đương ảo (Romance Scam) mượn tiền, hoặc lôi kéo vào nhóm Telegram bí mật đầu tư tài chính rác." },
//           { label: "Dấu hiệu", desc: "Hứa hẹn lợi nhuận khủng 'không rủi ro', liên tục vẽ ra các lý do tai nạn, ốm đau để thúc ép gửi tiền." }
//         ]
//       },
//       {
//         title: "Bẫy tuyển dụng (Job Scam)",
//         icon: <ShieldAlert className="w-4 h-4 text-amber" />,
//         details: [
//           { label: "Kịch bản", desc: "Quảng cáo việc làm tại nhà, xử lý đơn hàng ảo cho các sàn thương mại điện tử lớn với thu nhập hấp dẫn." },
//           { label: "Dấu hiệu", desc: "Bắt đóng tiền cọc quỹ, đóng phí đăng ký, mua tài liệu đào tạo hoặc ứng tiền mua hàng trước khi nhận việc." }
//         ]
//       },
//       {
//         title: "Bẫy mua sắm (E-commerce Scam)",
//         icon: <ShoppingBag className="w-4 h-4 text-amber" />,
//         details: [
//           { label: "Kịch bản", desc: "Rao bán hàng hóa, vé máy bay, tour du lịch hoặc đồ công nghệ cao với giá rẻ bất thường trên mạng." },
//           { label: "Dấu hiệu", desc: "Ép buộc người mua đặt cọc trước hoặc chuyển khoản 100% tiền hàng nhưng sau đó chặn liên lạc, không giao." }
//         ]
//       }
//     ]
//   }
// ];

//   return (
//     <section ref={containerRef} className="py-16 bg-cream overflow-hidden border-t border-border">
//       <div className="max-w-7xl mx-auto px-5 sm:px-8">

//         {/* Tiêu đề chính của toàn bộ Section */}
//         <div className="text-center space-y-2 mb-12">
//           <span className="text-[10px] font-bold tracking-widest text-amber uppercase bg-amber/10 px-2.5 py-1 rounded-md inline-block">
//             Cẩm nang an toàn số
//           </span>
//           <h2 className="text-2xl sm:text-3xl font-black text-ink uppercase tracking-tight">
//             Danh Mục 10 Hình Thức Lừa Đảo Trực Tuyến
//           </h2>
//           <p className="text-xs text-ink-muted max-w-md mx-auto">
//             Chọn một nhóm tấn công dưới đây để phân tích chi tiết kịch bản và dấu hiệu nhận biết của từng loại hình cụ thể.
//           </p>
//         </div>

//         {/* CẤU TRÚC RADIX ACCORDION ROOT */}
//         <Accordion.Root
//           type="multiple"
//           // collapsible
//           onValueChange={handleSectionOpen}
//           className="space-y-4"
//         >
//           {fraudGroups.map((group) => (
//             <Accordion.Item
//               key={group.id}
//               value={group.id}
//               className="border border-border rounded-2xl bg-white shadow-sm overflow-hidden"
//             >

//               {/* THANH TIÊU ĐỀ TITLE BAR CỦA MỖI NHÓM */}
//               <Accordion.Header className="flex">
//                 <Accordion.Trigger className="group-trigger-bar flex w-full items-center justify-between p-4 sm:p-5 bg-white hover:bg-cream/10 text-left transition-colors group outline-none focus:outline-none">
//                   <div className="space-y-1 pr-4">
//                     <h3 className="text-sm sm:text-base font-black text-ink tracking-wide uppercase">
//                       {group.title}
//                     </h3>
//                     <p className="text-[11px] sm:text-xs text-ink-muted font-normal max-w-2xl leading-normal">
//                       {group.description}
//                     </p>
//                   </div>

//                   {/* Mũi tên Chevron xoay động */}
//                   <ChevronDown className="w-5 h-5 text-ink-muted transition-transform duration-300 group-data-[state=open]:rotate-180 flex-shrink-0" />
//                 </Accordion.Trigger>
//               </Accordion.Header>

//               {/* KHUNG NỘI DUNG SẼ TRƯỢT XUỐNG KHI CLICK */}
//               <Accordion.Content className="overflow-hidden data-[state=closed]:animate-[slideUp_250ms_ease-in] data-[state=open]:animate-[slideDown_300ms_ease-out] border-t border-border/60 bg-cream/5">
//                 <div className="p-4 sm:p-6">

//                   {/* LƯỚI CHỨA ĐÚNG 3 CARD CHO MỖI NHÓM */}
//                   <div className="scams-card-grid grid grid-cols-1 md:grid-cols-3 gap-4">
//                     {group.cards.map((card, idx) => (
//                       <div
//                         key={idx}
//                         className="bg-white rounded-xl p-4 shadow-sm border border-border flex flex-col justify-between hover:shadow-md hover:border-amber/30 transition-all cursor-default"
//                       >
//                         <div className="space-y-3.5">
//                           {/* Tiêu đề của Card */}
//                           <div className="flex items-center gap-2 border-b border-border/60 pb-2">
//                             <span className="p-1.5 rounded-lg bg-cream/60 flex-shrink-0">
//                               {card.icon}
//                             </span>
//                             <h4 className="text-xs font-black text-ink tracking-wide uppercase leading-tight">
//                               {card.title}
//                             </h4>
//                           </div>

//                           {/* Chi tiết kịch bản và dấu hiệu */}
//                           <div className="space-y-3">
//                             {card.details.map((detail, dIdx) => (
//                               <div key={dIdx} className="space-y-1">
//                                 <span className="text-[10px] font-bold text-ink-light uppercase tracking-wider block">
//                                   {detail.label}
//                                 </span>
//                                 <p className="text-[11px] text-ink-muted leading-relaxed">
//                                   {detail.desc}
//                                 </p>
//                               </div>
//                             ))}
//                           </div>
//                         </div>

//                       </div>
//                     ))}
//                   </div>

//                 </div>
//               </Accordion.Content>

//             </Accordion.Item>
//           ))}
//         </Accordion.Root>

//       </div>

//       {/* CSS Animation tích hợp sẵn cho quá trình đóng/mở mượt mà của Radix Accordion */}
//       <style>{`
//         @keyframes slideDown {
//           from { height: 0; }
//           to { height: var(--radix-accordion-content-height); }
//         }
//         @keyframes slideUp {
//           from { height: var(--radix-accordion-content-height); }
//           to { height: 0; }
//         }
//       `}</style>
//     </section>
//   );
// }
interface AccordionProps {
  activeAction?: string;
}

export function FraudScenariosAccordion({ activeAction }: AccordionProps) {
  const containerRef = useRef<HTMLElement>(null);

  // Xác định xem Group nào sẽ được mở dựa trên bước hiện tại của Timeline
  let openValue = "";
  if (activeAction === 'open-group-1') openValue = "group-1";
  if (activeAction === 'open-group-2') openValue = "group-2";
  if (activeAction === 'open-group-3') openValue = "group-3";

  // Hiệu ứng load-in ban đầu khi vừa cuộn tới Section này
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.group-trigger-bar', {
        y: 25,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power3.out'
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  // Lắng nghe thay đổi bước từ Timeline để kích hoạt animation cho các Card con
  useEffect(() => {
    if (!openValue || !containerRef.current) return;

    // Kích hoạt chậm lại một chút để chờ Radix mở hoàn toàn khung Content ra
    const timer = setTimeout(() => {
      const activeItem = containerRef.current?.querySelector(`[data-value="${openValue}"]`);
      if (activeItem) {
        const cards = activeItem.querySelectorAll('.scams-card-grid > div');
        if (cards.length > 0) {
          gsap.killTweensOf(cards);
          gsap.fromTo(cards,
            { y: 25, opacity: 0, scale: 0.97 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.5,
              stagger: 0.1, // Hiện từng card một (stagger) cách nhau 0.1 giây cực đẹp
              ease: 'power2.out',
              overwrite: 'auto'
            }
          );
        }
      }
    }, 120); // Đảm bảo Radix đổi trạng thái xong xuôi

    return () => clearTimeout(timer);
  }, [openValue]);

  const fraudGroups = [
    {
      id: "group-1",
      title: "NHÓM 1: TẤN CÔNG TRỰC TIẾP QUA NGHE - NHÌN",
      description: "Những hình thức thao túng trực diện bằng giọng nói, hình ảnh công nghệ cao để ép buộc nạn nhân chuyển tiền gấp hoặc dụ dỗ sập bẫy.",
      cards: [
        {
          title: "Cuộc gọi trực tiếp (Vishing)",
          icon: <Phone className="w-4 h-4 text-red-600" />,
          details: [
            { label: "Kịch bản", desc: "Giả mạo Công an, Viện kiểm sát thông báo dính líu vụ án, hoặc đóng vai người thân vay tiền gấp." },
            { label: "Dấu hiệu", desc: "Tạo áp lực khẩn cấp, yêu cầu chuyển khoản ngay hoặc ép nhập cú pháp đổi eSIM chiếm số điện thoại." }
          ]
        },
        {
          title: "Bẫy Mạng xã hội",
          icon: <Share2 className="w-4 h-4 text-amber" />,
          details: [
            { label: "Kịch bản", desc: "Người lạ kết bạn bằng ảnh đại diện bắt mắt tạo lòng tin, rủ vào hội nhóm đầu tư, làm nhiệm vụ kiếm tiền." },
            { label: "Dấu hiệu", desc: "Gắn mác 'đầu tư ít, lợi nhuận cao', quảng cáo tuyển dụng 'việc nhẹ lương cao' hoặc dịch vụ lấy lại tiền bị lừa." }
          ]
        },
        {
          title: "Cuộc gọi Deepfake AI",
          icon: <Video className="w-4 h-4 text-red-600" />,
          details: [
            { label: "Kịch bản", desc: "Sử dụng trí tuệ nhân tạo (AI) sao chép gương mặt và giọng nói của người thân, bạn bè để gọi video." },
            { label: "Dấu hiệu", desc: "Cuộc gọi mờ, chập chờn, giả vờ sóng yếu để yêu cầu chuyển tiền cứu trợ khẩn cấp vào tài khoản lạ." }
          ]
        }
      ]
    },
    {
      id: "group-2",
      title: "NHÓM 2: KỸ THUẬT SỐ QUA VĂN BẢN VÀ ĐƯỜNG LINK",
      description: "Tấn công phi kỹ thuật thông qua tin nhắn và email giả mạo, dẫn dụ cài đặt mã độc để chiếm quyền điều khiển thiết bị từ xa.",
      cards: [
        {
          title: "Tin nhắn SMS & Email Phishing",
          icon: <Mail className="w-4 h-4 text-amber" />,
          details: [
            { label: "Kịch bản", desc: "Gửi Email/SMS giả mạo ngân hàng hoặc tổ chức thông báo tài khoản bị khóa, đóng băng." },
            { label: "Dấu hiệu", desc: "Email sai chính tả, chứa link lạ hoặc link rút gọn yêu cầu nhấp vào để xác thực khẩn cấp." }
          ]
        },
        {
          title: "Website Giả mạo",
          icon: <Globe className="w-4 h-4 text-red-600" />,
          details: [
            { label: "Kịch bản", desc: "Sao chép 99% giao diện đăng nhập hoặc thanh toán của ngân hàng, ví điện tử, cơ quan nhà nước." },
            { label: "Dấu hiệu", desc: "Tên miền (URL) có ký tự lạ, thừa thiếu chữ, không có chứng chỉ bảo mật SSL (biểu tượng ổ khóa)." }
          ]
        },
        {
          title: "Phần mềm & Tệp mã độc",
          icon: <FileCode className="w-4 h-4 text-red-600" />,
          details: [
            { label: "Kịch bản", desc: "Lừa nạn nhân cài đặt app dịch vụ công giả mạo hoặc bấm vào file đính kèm chứa mã độc (.exe, .apk, .zip)." },
            { label: "Dấu hiệu", desc: "Yêu cầu cấp quyền Accessibility (Trợ năng) trên điện thoại để âm thầm chiếm quyền điều khiển tài khoản ngân hàng." }
          ]
        }
      ]
    },
    {
      id: "group-3",
      title: "NHÓM 3: ĐÁNH THẲNG VÀO ĐỜI SỐNG - BẪY TÂM LÝ",
      description: "Lợi dụng lòng tin, nhu cầu tài chính và thói quen mua sắm của nạn nhân để thực hiện các hành vi lừa đảo chiếm đoạt tài sản.",
      cards: [
        {
          title: "Thao túng Tình cảm & Đầu tư",
          icon: <Heart className="w-4 h-4 text-red-600" />,
          details: [
            { label: "Kịch bản", desc: "Tạo mối quan hệ yêu đương ảo (Romance Scam) mượn tiền, hoặc lôi kéo vào nhóm Telegram bí mật đầu tư tài chính rác." },
            { label: "Dấu hiệu", desc: "Hứa hẹn lợi nhuận khủng 'không rủi ro', liên tục vẽ ra các lý do tai nạn, ốm đau để thúc ép gửi tiền." }
          ]
        },
        {
          title: "Bẫy mua sắm (E-commerce Scam)",
          icon: <ShoppingBag className="w-4 h-4 text-amber" />,
          details: [
            { label: "Kịch bản", desc: "Rao bán hàng hóa, vé máy bay, tour du lịch hoặc đồ công nghệ cao với giá rẻ bất thường trên mạng." },
            { label: "Dấu hiệu", desc: "Ép buộc người mua đặt cọc trước hoặc chuyển khoản 100% tiền hàng nhưng sau đó chặn liên lạc, không giao." }
          ]
        },
        {
          title: "Bẫy tuyển dụng (Job Scam)",
          icon: <ShieldAlert className="w-4 h-4 text-amber" />,
          details: [
            { label: "Kịch bản", desc: "Quảng cáo việc làm tại nhà, xử lý đơn hàng ảo cho các sàn thương mại điện tử lớn với thu nhập hấp dẫn." },
            { label: "Dấu hiệu", desc: "Bắt đóng tiền cọc quỹ, đóng phí đăng ký, mua tài liệu đào tạo hoặc ứng tiền mua hàng trước khi nhận việc." }
          ]
        },
      ]
    }
  ];

  return (
    // Thêm ID cho Section để khớp lệnh cuộn của Timeline lớp cha
    <section ref={containerRef} className="py-16 bg-cream overflow-hidden border-t border-border min-h-[120vh]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">

        <div className="text-center space-y-2 mb-12">
          <span className="text-[10px] font-bold tracking-widest text-amber uppercase bg-amber/10 px-2.5 py-1 rounded-md inline-block">
            Cẩm nang an toàn số
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-ink uppercase tracking-tight">
            Danh Mục 10 Hình Thức Lừa Đảo Trực Tuyến
          </h2>
        </div>

        {/* Chuyển value sang chế độ kiểm soát thủ công thông qua biến openValue từ Timeline */}
        <Accordion.Root
          type="single" // Chuyển thành "single" để tự động đóng mục cũ khi mục mới mở, giao diện gọn gàng hơn
          collapsible
          value={openValue}
          className="space-y-4"
        >
          {fraudGroups.map((group) => (
            <Accordion.Item
              key={group.id}
              value={group.id}
              id={`accordion-${group.id}`}
              className="border border-border rounded-2xl bg-white shadow-sm overflow-hidden"
            >
              <Accordion.Header className="flex">
                {/* Vô hiệu hóa pointer-events để tránh việc click chuột trực tiếp phá vỡ luồng Timeline */}
                <Accordion.Trigger className="group-trigger-bar pointer-events-none flex w-full items-center justify-between p-4 sm:p-5 bg-white text-left outline-none">
                  <div className="space-y-1 pr-4">
                    <h3 className="text-sm sm:text-base font-black text-ink tracking-wide uppercase">
                      {group.title}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-ink-muted font-normal max-w-2xl leading-normal">
                      {group.description}
                    </p>
                  </div>
                  <ChevronDown className="w-5 h-5 text-ink-muted transition-transform duration-300 group-data-[state=open]:rotate-180 flex-shrink-0" />
                </Accordion.Trigger>
              </Accordion.Header>

              <Accordion.Content className="overflow-hidden data-[state=closed]:animate-[slideUp_250ms_ease-in] data-[state=open]:animate-[slideDown_300ms_ease-out] border-t border-border/60 bg-cream/5">
                <div className="p-4 sm:p-6">
                  <div className="scams-card-grid grid grid-cols-1 md:grid-cols-3 gap-4">
                    {group.cards.map((card, idx) => (
                      <div
                        key={idx}
                        className="bg-white rounded-xl p-4 shadow-sm border border-border flex flex-col justify-between"
                      >
                        <div className="space-y-3.5">
                          <div className="flex items-center gap-2 border-b border-border/60 pb-2">
                            <span className="p-1.5 rounded-lg bg-cream/60 flex-shrink-0">{card.icon}</span>
                            <h4 className="text-xs font-black text-ink tracking-wide uppercase leading-tight">{card.title}</h4>
                          </div>
                          <div className="space-y-3">
                            {card.details.map((detail, dIdx) => (
                              <div key={dIdx} className="space-y-1">
                                <span className="text-[10px] font-bold text-ink-light uppercase tracking-wider block">{detail.label}</span>
                                <p className="text-[11px] text-ink-muted leading-relaxed">{detail.desc}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>

      <style>{`
        @keyframes slideDown { from { height: 0; } to { height: var(--radix-accordion-content-height); } }
        @keyframes slideUp { from { height: var(--radix-accordion-content-height); } to { height: 0; } }
      `}</style>
    </section>
  );
}

/* ═══════════════════════════════════════════
   PSYCHOLOGY - WITH DIALOG
   ═══════════════════════════════════════════ */
function PsychologySection() {
  const ref = useRef<HTMLElement>(null);
  const [openPsych, setOpenPsych] = useState<number | null>(null);
  const active = PSYCH_DETAILS[openPsych ?? -1];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.psych-card', { y: 40, opacity: 0, scale: 0.95 }, { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.08, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 75%' } });
      gsap.fromTo('.psych-img', { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 75%' } });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="py-16 sm:py-20 bg-ink text-white relative overflow-hidden">
      <FloatingParticles count={20} color="#C4882B" />
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-16">
        <div className="text-center mb-10">
          <span className="inline-block bg-amber/20 text-amber text-xs font-bold uppercase px-4 py-2 rounded-full mb-3">Tâm lý học</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase">Kẻ lừa đảo tấn công tâm lý như thế nào</h2>
          <p className="text-white/60 mt-3 max-w-2xl mx-auto text-sm">
            Lừa đảo không chỉ là công nghệ, mà là nghệ thuật đánh vào tâm lý. <span className="text-amber font-semibold">Click để xem cách đối phó.</span>
          </p>
        </div>

        <div className="psych-img mb-8 rounded-2xl overflow-hidden shadow-md hidden lg:block">
          <img src="/images/psychology-illustration.jpg" alt="6 yếu tố tâm lý" className="w-full h-48 object-cover" loading="lazy" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PSYCH_DETAILS.map((item, idx) => (
            <button
              key={item.num}
              onClick={() => setOpenPsych(idx)}
              className="psych-card bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10 hover:border-amber/40 hover:bg-white/10 transition-all duration-300 group text-left"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl font-black text-amber/30">{item.num}</span>
                <div className="text-amber group-hover:scale-110 transition-transform">{item.icon}</div>
              </div>
              <h3 className="font-bold text-base uppercase mb-1">{item.title}</h3>
              <p className="text-amber text-xs font-medium mb-3">{item.subtitle}</p>
              <p className="text-white/60 text-sm leading-relaxed line-clamp-3">{item.desc}</p>
              <div className="flex items-center gap-2 text-amber text-xs font-semibold mt-3">
                <Info className="w-4 h-4" />
                <span>Click xem chi tiết</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <Dialog open={openPsych !== null} onOpenChange={() => setOpenPsych(null)}>
        <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto bg-ink border-white/20 text-white">
          {active && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3">
                  <div className="text-amber">{active.icon}</div>
                  <div>
                    <DialogTitle className="text-xl font-black text-white">{active.title}</DialogTitle>
                    <DialogDescription className="text-amber font-medium">{active.subtitle}</DialogDescription>
                  </div>
                </div>
              </DialogHeader>
              <div className="space-y-5 mt-4">
                <div className="bg-white/5 rounded-xl p-4">
                  <h4 className="font-bold text-sm uppercase text-white mb-2 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-danger" /> Chiêu trò
                  </h4>
                  <p className="text-sm text-white/70 leading-relaxed">{active.desc}</p>
                </div>
                <div className="bg-amber/10 rounded-xl p-4 border border-amber/30">
                  <h4 className="font-bold text-sm uppercase text-amber mb-2 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4" /> Cách đối phó
                  </h4>
                  <p className="text-sm text-white/80 leading-relaxed">{active.solution}</p>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}

/* ═══════════════════════════════════════════
   CHANNELS SECTION
   ═══════════════════════════════════════════ */
function ChannelsSection() {
  const ref = useRef<HTMLElement>(null);
  const channels = [
    { img: '/images/channel-social.jpg', title: 'Mạng xã hội', desc: 'Facebook, Zalo, Telegram là các kênh phổ biến nhất. Kẻ lừa đảo tạo tài khoản giả, kết bạn và dần lừa nạn nhân.', warnings: ['Không kết bạn người lạ', 'Kiểm tra lịch sử tài khoản', 'Không chia sẻ thông tin cá nhân'] },
    { img: '/images/channel-website.jpg', title: 'Website giả mạo', desc: 'Sao chép giao diện trang web chính thức với URL gần giống, thiếu chứng chỉ bảo mật SSL.', warnings: ['Kiểm tra URL kỹ lưỡng', 'Tìm biểu tượng ổ khóa', 'Không đăng nhập qua link lạ'] },
    { img: '/images/channel-app.jpg', title: 'Ứng dụng giả mạo', desc: 'App giả mạo tải từ nguồn không chính thức, chứa mã độc đánh cắp dữ liệu.', warnings: ['Chỉ tải từ App Store/CH Play', 'Kiểm tra nhà phát triển', 'Đọc đánh giá người dùng'] },
    { img: '/images/channel-qr.jpg', title: 'Mã QR độc hại', desc: 'Mã QR dán ở nơi công cộng chứa link độc hại. Quét xong bị chuyển hướng sang trang lừa đảo.', warnings: ['Không quét QR lạ', 'Kiểm tra link sau khi quét', 'Cẩn thận với QR ở nơi công cộng'] },
    { img: '/images/channel-email.jpg', title: 'Email & SMS lừa đảo', desc: 'Tin nhắn mạo danh ngân hàng, cơ quan nhà nước với link độc hại.', warnings: ['Không click link trong email lạ', 'Kiểm tra địa chỉ người gửi', 'Liên hệ trực tiếp để xác minh'] },
    { img: '/images/channel-crypto.jpg', title: 'Ví điện tử & Tiền ảo', desc: 'Các nền tảng ví kỹ thuật số, sàn giao dịch crypto giả mạo.', warnings: ['Chỉ dùng sàn uy tín', 'Không chia sẻ private key', 'Bật 2FA cho mọi giao dịch'] },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.channel-card', { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 75%' } });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="py-16 sm:py-20 bg-cream border-t border-border">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-16">
        <div className="text-center mb-10">
          <span className="inline-block bg-copper/10 text-copper text-xs font-bold uppercase px-4 py-2 rounded-full mb-3">Kênh phân phối</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-ink">Các kênh và kỹ thuật lừa đảo</h2>
          <p className="text-ink-light mt-3 max-w-2xl mx-auto text-sm">
            Tội phạm mạng sử dụng đa dạng kênh để tiếp cận nạn nhân.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {channels.map((item, idx) => (
            <div key={idx} className="channel-card bg-white rounded-2xl overflow-hidden shadow-sm border border-border hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="h-40 sm:h-44 overflow-hidden relative">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" loading="lazy" />
                <div className="absolute top-3 left-3 bg-amber text-white text-xs font-bold px-3 py-1 rounded-full">#{idx + 1}</div>
              </div>
              <div className="p-4 sm:p-5">
                <h3 className="font-bold text-base sm:text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-ink-light mb-3">{item.desc}</p>
                <div className="space-y-1.5">
                  {item.warnings.map((w, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs">
                      <ShieldCheck className="w-3.5 h-3.5 text-success flex-shrink-0 mt-0.5" />
                      <span className="text-ink-muted">{w}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PsychologicalManipulationSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hiệu ứng fade-in mượt mà tuần tự cho các thẻ đòn bẩy tâm lý
      gsap.fromTo('.tactic-card',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const manipulationTactics = [
    {
      title: "Kích thích Sự Sợ Hãi",
      icon: <ShieldAlert className="w-5 h-5 text-red-600" />,
      bgIcon: "bg-red-50",
      desc: "Giả mạo Công an, Viện Kiểm sát hoặc Tòa án thông báo nạn nhân dính líu đến đại án hình sự. Chúng liên tục dồn ép, cô lập và ra lệnh chuyển tiền 'giám định' nhằm triệt hạ khả năng phòng bị lý trí.",
      highlight: "Đánh vào: Nỗi sợ vi phạm pháp luật"
    },
    {
      title: "Đánh trúng Lòng Tham",
      icon: <DollarSign className="w-5 h-5 text-emerald-600" />,
      bgIcon: "bg-emerald-50",
      desc: "Vẽ ra viễn cảnh 'việc nhẹ lương cao', nhiệm vụ thả tim nhận tiền, hoặc các sàn đầu tư cam kết lãi khủng 100% không rủi ro. Chúng mồi chài bằng vài khoản lợi nhuận nhỏ ban đầu để dụ nạp số tiền lớn hơn.",
      highlight: "Đánh vào: Nhu cầu tài chính nhanh"
    },
    {
      title: "Lợi dụng Tình Thương",
      icon: <Heart className="w-5 h-5 text-pink-600" />,
      bgIcon: "bg-pink-50",
      desc: "Sử dụng Deepfake giả giọng nói/hình ảnh người thân gặp tai nạn cấp cứu cần tiền gấp, hoặc giăng bẫy tình cảm ảo (Romance Scam) dài hạn rồi dàn dựng kịch bản ốm đau, nợ nần để mượn tiền.",
      highlight: "Đánh vào: Lòng trắc ẩn & Quan hệ ruột thịt"
    },
    {
      title: "Kích thích Sự Tò Mò",
      icon: <Sparkles className="w-5 h-5 text-amber" />,
      bgIcon: "bg-amber/10",
      desc: "Gửi tin nhắn chứa các tiêu đề giật gân, thông báo trúng thưởng quà tặng xa xỉ, hoặc cảnh báo tài khoản ngân hàng bị xâm nhập trái phép, thúc ép nạn nhân click vào các đường link lạ để tự tra cứu.",
      highlight: "Đánh vào: Tâm lý hiếu kỳ & Cảnh giác"
    }
  ];

  return (
    <section ref={sectionRef} className="py-16 sm:py-24 bg-cream overflow-hidden">
      <div className="relative left-[50%] -translate-x-1/2 max-w-[90vw] psych-img mb-8 rounded-2xl overflow-hidden shadow-md hidden lg:block">
        <img src="/images/psychology-illustration.jpg" alt="6 yếu tố tâm lý" className="w-full h-48 object-cover" loading="lazy" />
      </div>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-16">

        {/* Khung nội dung bố cục Split: Tiêu đề lớn bên trái, diễn giải kịch bản bên phải */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">

          <div className="lg:col-span-5 space-y-3">
            <span className="text-[10px] font-bold tracking-widest text-red-600 uppercase bg-red-50 px-2.5 py-1 rounded-md inline-block">
              Vũ khí thao túng tâm lý
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-ink uppercase tracking-tight leading-tight">
              Bên Trong Kịch Bản <br /> Điều Khiển Tâm Trí
            </h2>
          </div>

          <div className="lg:col-span-7 lg:pt-4">
            <p className="text-sm sm:text-base text-ink-light leading-relaxed font-medium">
              Thủ đoạn của tội phạm mạng không đơn thuần là tấn công kỹ thuật, mà luôn tuân theo những <span className="text-red-600 font-bold">kịch bản thao túng được biên soạn khéo léo</span>. Chúng sẵn sàng đóng nhiều vai nhân vật khác nhau, dàn dựng bối cảnh âm thanh chân thực nhằm kích thích các xung động cảm xúc cốt lõi của con người.
            </p>
          </div>

        </div>

        {/* Lưới 4 đòn bẩy tâm lý phổ biến (2 cột trên máy tính, 1 cột trên điện thoại) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {manipulationTactics.map((tactic, idx) => (
            <div
              key={idx}
              className="tactic-card bg-cream/20 border border-border/80 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row gap-4 items-start hover:shadow-md hover:border-amber/20 hover:bg-white transition-all duration-300 group"
            >
              {/* Khung Icon đại diện */}
              <div className={`p-3 rounded-xl ${tactic.bgIcon} flex-shrink-0 group-hover:scale-105 transition-transform`}>
                {tactic.icon}
              </div>

              {/* Nội dung phân tích đòn bẩy */}
              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h3 className="font-black text-sm sm:text-base text-ink uppercase tracking-wide">
                    {tactic.title}
                  </h3>
                  <span className="text-[10px] font-bold text-ink-light bg-white border border-border px-2 py-0.5 rounded-md self-start sm:self-auto">
                    {tactic.highlight}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                  {tactic.desc}
                </p>
              </div>

            </div>
          ))}
        </div>

        {/* Khung cảnh báo tổng kết trực quan ở chân Section */}
        <div className="tactic-card mt-10 bg-ink text-white rounded-2xl p-5 flex flex-col sm:flex-row items-center gap-4 border border-ink shadow-xl">
          <div className="p-3 rounded-xl bg-white/10 text-amber flex-shrink-0">
            <BrainCircuit className="w-6 h-6 animate-[pulse_2s_infinite]" />
          </div>
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-xs font-black tracking-wider text-amber uppercase">
              Nguyên tắc vàng để phá vỡ kịch bản thao túng:
            </h4>
            <p className="text-[11px] sm:text-xs text-white/80 leading-relaxed">
              Khi cảm xúc (Sợ hãi, Tham lam, Thương cảm, Tò mò) bị đẩy lên cao độ, đó là lúc kẻ gian đang điều khiển bạn. Hãy <span className="text-white font-bold underline decoration-amber underline-offset-4">Dừng lại 5 phút</span>, ngắt kết nối cuộc gọi và chủ động xác minh độc lập qua kênh chính thống.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   REBUTTAL SECTION
   ═══════════════════════════════════════════ */
function RebuttalSection() {
  const ref = useRef<HTMLElement>(null);
  const points = [
    { num: '01', subtitle: 'GIẢM THIỂU BẢN CHẤT ĐA DẠNG', title: 'Tội phạm không chỉ vì tiền', content: 'Lừa đảo trực tuyến không chỉ nhắm đến tiền bạc. Tội phạm còn nhắm đến: đánh cắp thông tin cá nhân, cài mã độc, bôi nhọ danh dự, tống tiền, hack tài khoản để lừa tiếp người thân. Theo Sổ Tay Cục ATTT, "đánh cắp thông tin cá nhân" là mục đích hàng đầu.', items: ['Thông tin cá nhân (CCCD, số điện thoại)', 'Tài khoản mạng xã hội (Facebook, Zalo)', 'Danh dự và hình ảnh cá nhân'] },
    { num: '02', subtitle: 'COI THƯỜNG GIÁ TRỊ TÀI SẢN VÔ HÌNH', title: 'Giá trị vượt xa con số trong tài khoản', content: 'Người nghèo vẫn có danh tính, tài khoản mạng xã hội, thông tin cá nhân, tình cảm, niềm tin - tất cả đều là hàng hóa có giá trị. 66,24% người dùng VN xác nhận thông tin của họ từng bị sử dụng trái phép.', items: ['Danh tính số có thể bán trên chợ đen', 'Lịch sử duyệt web bị khai thác', 'Mạng lưới quan hệ bị lợi dụng để lừa tiếp'] },
    { num: '03', subtitle: 'PHÂN BIỆT ĐỐI XỬ', title: 'Người nghèo là mục tiêu hấp dẫn', content: 'Tội phạm nhắm vào sự nhẹ dạ, cần kíp, thiếu thông tin - không chỉ tài sản hiện có. Ngườii nghèo thường chủ quan nghĩ "mình không có gì để mất", dẫn đến ít đề phòng và dễ bị tấn công hơn.', items: ['Chi phí săn mồi thấp (1 cuộc gọi/tin nhắn)', 'Dễ kiểm soát do ít tiếp cận pháp lý', 'Tự tin sai lầm: "không có tiền nên không sợ bị lừa"'] },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.rebuttal-card', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 75%' } });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="py-16 sm:py-20 bg-cream border-border border-t">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-16">
        <div className="text-center mb-10">
          <span className="inline-block bg-danger/10 text-danger text-xs font-bold uppercase px-4 py-2 rounded-full mb-3">Phản biện</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-ink">"Không có tiền thì sao bị lừa?"</h2>
          <p className="text-ink-light mt-3 max-w-2xl mx-auto text-sm">
            Quan điểm này mắc 3 lỗi logic nguy hiểm.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {points.map((item) => (
            <div key={item.num} className="rebuttal-card bg-white rounded-2xl p-5 sm:p-6 shadow-sm border-l-4 border-amber hover:shadow-lg transition-all">
              <span className="text-3xl sm:text-4xl font-black text-amber/20">{item.num}</span>
              <p className="text-xs font-bold text-copper uppercase mt-2 mb-1">{item.subtitle}</p>
              <h3 className="text-lg sm:text-xl font-black mb-3">{item.title}</h3>
              <p className="text-sm text-ink-light mb-4 leading-relaxed">{item.content}</p>
              <ul className="space-y-2">
                {item.items.map((it, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-ink">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber flex-shrink-0 mt-0.5" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   VICTIMS SECTION
   ═══════════════════════════════════════════ */
function VictimsSection() {
  const ref = useRef<HTMLElement>(null);
  const cards = [
    { num: 1, icon: <Shield className="w-6 h-6" />, title: 'ĐÁNH CẮP THÔNG TIN CÁ NHÂN', desc: '66.24% người dùng VN bị sử dụng trái phép. Thông tin cá nhân (CCCD, số điện thoại, email) khi rơi vào tay tội phạm có thể dùng để mở tài khoản ngân hàng, vay nợ, mua hàng trả góp - chủ nhân gánh hậu quả pháp lý.', stat: '66.24%', statLabel: 'người dùng bị lộ' },
    { num: 2, icon: <Users className="w-6 h-6" />, title: 'CÔNG CỤ TỘI PHẠM (Money Mule)', desc: 'Bán tài khoản ngân hàng giá 200.000đ nhưng thực hiện 120.000 giao dịch với giá trị 550,7 tỷ đồng. Nạn nhân bị xử lý hình sự vì tiếp tay tội phạm, khung hình phạt đến 7 năm tù.', stat: '550.7 tỷ', statLabel: 'giá trị giao dịch' },
    { num: 3, icon: <Heart className="w-6 h-6" />, title: 'LỪA ĐẢO TÌNH CẢM (Romance Scam)', desc: 'Kẻ lừa đảo kiên nhẫn xây dựng mối quan hệ tháng trờii, giả vờ yêu thương, hứa hôn nhân, rồi dẫn vào sàn đầu tư giả. Một đường dây quy mô gần 3.000 nạn nhân đã bị triệt phá tại Việt Nam.', stat: '3.000', statLabel: 'nạn nhân/VN' },
    { num: 4, icon: <HandCoins className="w-6 h-6" />, title: 'LỪA ĐẢO TUYỂN DỤNG "VIỆC NHẸ LƯƠNG CAO"', desc: 'Lợi dụng tâm lý muốn có thu nhập nhanh của thanh thiếu niên, phụ nữ vùng nông thôn. 65 công dân Việt Nam được giải cứu tại Campuchia chỉ trong tháng 11/2025, hầu hết bị ép buộc tham gia đường dây lừa đảo.', stat: '65+', statLabel: 'nạn nhân/tháng' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.victim-img', { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 75%' } });
      gsap.fromTo('.victim-card', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.15, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 75%' } });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="py-16 sm:py-20 bg-ink text-white relative overflow-hidden">
      <FloatingParticles count={18} color="#C4882B" />
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-16">
        <div className="text-center mb-10">
          <span className="inline-block bg-danger/20 text-danger text-xs font-bold uppercase px-4 py-2 rounded-full mb-3">Hậu quả</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase">KHI NẠN NHÂN KHÔNG CHỈ MẤT TIỀN</h2>
          <p className="text-white/60 mt-3 max-w-2xl mx-auto text-sm">
            Ngoài tài chính, nạn nhân còn đối mặt với nhiều hậu quả nghiêm trọng.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6 items-center">
          <div className="space-y-4">
            {cards.slice(0, 2).map((item) => (
              <div key={item.num} className="victim-card bg-white text-ink rounded-2xl p-4 sm:p-5 shadow-lg">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-full bg-amber text-white flex items-center justify-center font-bold text-sm">{item.num}</div>
                  <div className="text-amber">{item.icon}</div>
                </div>
                <h3 className="font-bold text-xs uppercase mb-2">{item.title}</h3>
                <p className="text-xs text-ink-light mb-3 leading-relaxed">{item.desc}</p>
                <div className="bg-amber/10 rounded-lg px-3 py-1.5 inline-block">
                  <span className="text-amber font-black text-base">{item.stat}</span>
                  <span className="text-ink-muted text-xs ml-1">{item.statLabel}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="victim-img flex justify-center">
            <div className="relative">
              <img src="/images/section7-passport.jpg" alt="Identity theft" className="w-48 h-48 sm:w-56 sm:h-56 object-cover rounded-2xl shadow-2xl" loading="lazy" />
              <div className="absolute -bottom-3 -right-3 bg-amber text-white rounded-xl px-3 py-1.5 shadow-lg">
                <p className="text-xs font-bold">Identity Theft</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            {cards.slice(2, 4).map((item) => (
              <div key={item.num} className="victim-card bg-white text-ink rounded-2xl p-4 sm:p-5 shadow-lg">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-full bg-amber text-white flex items-center justify-center font-bold text-sm">{item.num}</div>
                  <div className="text-amber">{item.icon}</div>
                </div>
                <h3 className="font-bold text-xs uppercase mb-2">{item.title}</h3>
                <p className="text-xs text-ink-light mb-3 leading-relaxed">{item.desc}</p>
                <div className="bg-amber/10 rounded-lg px-3 py-1.5 inline-block">
                  <span className="text-amber font-black text-base">{item.stat}</span>
                  <span className="text-ink-muted text-xs ml-1">{item.statLabel}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   POOR PEOPLE SECTION
   ═══════════════════════════════════════════ */
function PoorPeopleSection() {
  const ref = useRef<HTMLElement>(null);
  const leftItems = [
    { icon: <Phone className="w-5 h-5" />, title: 'SĂN MỒI CHI PHÍ THẤP', desc: 'Giả danh công an: Chỉ cần một cuộc gọi hoặc tin nhắn là đủ, tốn rất ít công sức và chi phí so với tiềm năng thu lợi.' },
    { icon: <FileWarning className="w-5 h-5" />, title: 'DỄ KIỂM SOÁT', desc: 'Ngườii nghèo ít có khả năng tiếp cận tư vấn pháp lý chuyên nghiệp, không biết cách bảo vệ quyền lợi của mình.' },
    { icon: <UserX className="w-5 h-5" />, title: 'BỊ ĐE DỌA & THAO TÚNG', desc: 'Sợ ảnh hưởng danh dự gia đình nên im lặng không dám tố giác. Tội phạm lợi dụng tâm lý này để tiếp tục hành vi.' },
  ];
  const rightItems = [
    { icon: <CreditCard className="w-5 h-5" />, title: 'TÀI KHOẢN RỬA TIỀN', desc: 'Cung cấp danh tính để mở tài khoản ngân hàng, lưu thông tiền bẩn cho các đường dây tội phạm xuyên quốc gia.' },
    { icon: <Shield className="w-5 h-5" />, title: 'GIẢ DANH DANH TÍNH', desc: 'Danh tính bị lợi dụng để đăng ký các dịch vụ gian lận: SIM rác, tài khoản ngân hàng ảo, vay tín dụng đen.' },
    { icon: <AlertTriangle className="w-5 h-5" />, title: 'LAO ĐỘNG ÉP BUỘC', desc: 'Thân xác và sức lực bị bóc lột trong các "xưởng lừa đảo" ở nước ngoàii, làm việc 12-14 giờ/ngày không lương.' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.poor-l', { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6, stagger: 0.12, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 75%' } });
      gsap.fromTo('.poor-r', { x: 40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6, stagger: 0.12, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 75%' } });
      gsap.fromTo('.poor-warn', { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, delay: 0.4, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 75%' } });
      gsap.fromTo('.poor-img', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 75%' } });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="py-16 sm:py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-16">
        <div className="text-center mb-8">
          <span className="inline-block bg-copper/10 text-copper text-xs font-bold uppercase px-4 py-2 rounded-full mb-3">Phân tích xã hội</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-ink uppercase">NGƯỜI NGHÈO — MỤC TIÊU HAY NẠN NHÂN BỊ LÃNG QUÊN</h2>
        </div>

        {/* Image for desktop */}
        <div className="poor-img mb-8 rounded-2xl overflow-hidden shadow-md hidden lg:block">
          <img src="/images/poor-people-illustration.jpg" alt="Ngườii nghèo và lừa đảo" className="w-full h-48 object-cover" loading="lazy" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          <div>
            <p className="text-xs font-bold text-copper uppercase mb-1">TẠI SAO HỌ LÀ MỤC TIÊU HẤP DẪN?</p>
            <p className="text-xs text-ink-muted uppercase mb-4">YẾU TỐ CHI PHÍ & ĐIỀU KHIỂN</p>
            {leftItems.map((item, idx) => (
              <div key={idx} className="poor-l bg-white rounded-xl p-4 shadow-sm border border-border mb-3 flex items-start gap-3 hover:shadow-md transition-all">
                <div className="w-9 h-9 rounded-lg bg-amber/10 text-amber flex items-center justify-center flex-shrink-0">{item.icon}</div>
                <div>
                  <h3 className="font-bold text-sm uppercase mb-1">{item.title}</h3>
                  <p className="text-xs text-ink-light leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div>
            <p className="text-xs font-bold text-copper uppercase mb-1">VAI TRÒ TRONG CHUỖI TỘI PHẠM</p>
            <p className="text-xs text-ink-muted uppercase mb-4">NGUỒN CUNG CẤP NGUYÊN LIỆU</p>
            {rightItems.map((item, idx) => (
              <div key={idx} className="poor-r bg-white rounded-xl p-4 shadow-sm border border-border mb-3 flex items-start gap-3 hover:shadow-md transition-all">
                <div className="w-9 h-9 rounded-lg bg-danger/10 text-danger flex items-center justify-center flex-shrink-0">{item.icon}</div>
                <div>
                  <h3 className="font-bold text-sm uppercase mb-1">{item.title}</h3>
                  <p className="text-xs text-ink-light leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="poor-warn mt-6 bg-gradient-to-r from-amber/20 to-copper/20 rounded-xl p-4 text-center border border-amber/30">
          <p className="text-sm font-bold text-ink">
            SAI LẦM "KHÔNG CÓ TIỀN": Tự tin chủ quan → ít đề phòng → dễ bị tấn công hơn cả người có tiền.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   GOLDEN RULES SECTION
   ═══════════════════════════════════════════ */
function GoldenRulesSection() {
  const ref = useRef<HTMLElement>(null);
  const steps = [
    { title: 'CHẬM LẠI', desc: 'Tình huống có gấp gáp thế nào cũng nên chậm lại để suy nghĩ.', icon: <Clock className="w-7 h-7 sm:w-8 sm:h-8" /> },
    { title: 'KIỂM TRA', desc: 'Xác minh thông tin qua kênh chính thức: gọi lại hotline ngân hàng để xác định danh tính cuộc gọi, liên hệ trực tiếp.', icon: <Search className="w-7 h-7 sm:w-8 sm:h-8" /> },
    { title: 'DỪNG, KHÔNG GỬI', desc: 'Ngừng mọi hành động nếu có dấu hiệu đáng ngờ. Không ai có quyền ép buộc bạn. Không chuyển tiền hay thông tin cho đối tượng không xác định danh tính.', icon: <XCircle className="w-7 h-7 sm:w-8 sm:h-8" /> },
    // { title: 'KHÔNG GỬI', desc: 'Không chuyển tiền hay thông tin cho đối tượng không xác định danh tính.', icon: <XCircle className="w-7 h-7 sm:w-8 sm:h-8" /> },
  ];
  const rules = [
    { icon: <Lock className="w-5 h-5" />, text: 'Không cung cấp thông tin cá nhân cho người không quen biết.' },
    { icon: <UserX className="w-5 h-5" />, text: 'Không kết bạn, trò chuyện với người lạ trên mạng.' },
    { icon: <Link2 className="w-5 h-5" />, text: 'Không truy cập đường dẫn từ người gửi không xác định.' },
    { icon: <Shield className="w-5 h-5" />, text: 'Không có cán bộ nhà nước nào gọi điện điều tra qua điện thoại.' },
    { icon: <Banknote className="w-5 h-5" />, text: 'Không chuyển khoản trước, đặt cọc cho người lạ.' },
    { icon: <AlertTriangle className="w-5 h-5" />, text: 'Không tham lam tài sản không rõ nguồn gốc, lợi nhuận phi thực tế.' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.step-card', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.12, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 75%' } });
      gsap.fromTo('.rule-item', { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.4, stagger: 0.08, ease: 'power3.out', scrollTrigger: { trigger: '.rules-grid', start: 'top 85%' } });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="py-16 sm:py-20 bg-cream border-t border-border">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-16">
        <div className="text-center mb-10">
          <span className="inline-block bg-success/10 text-success text-xs font-bold uppercase px-4 py-2 rounded-full mb-3">Bảo vệ bản thân</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-ink uppercase">NGUYÊN TẮC VÀNG: CHẬM — KIỂM TRA — DỪNG, KHÔNG GỬI</h2>
          <p className="text-ink-light mt-3 max-w-2xl mx-auto text-sm">
            Nguyên tắc 3C đơn giản nhưng hiệu quả nhất để tự bảo vệ.
          </p>
        </div>
        <div className="flex flex-wrap justify-center items-stretch gap-3 sm:gap-4 mb-12">
          {steps.map((step, idx) => (
            <div key={idx} className="flex items-center gap-2 sm:gap-3">
              <div className="step-card bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-border text-center w-36 sm:w-44 hover:shadow-lg hover:-translate-y-1 transition-all">
                <div className="text-amber mb-2 flex justify-center">{step.icon}</div>
                <h3 className="font-bold text-amber text-sm sm:text-base mb-1">{step.title}</h3>
                <p className="text-xs text-ink-light leading-relaxed">{step.desc}</p>
              </div>
              {idx < steps.length - 1 && <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-amber flex-shrink-0 hidden sm:block" />}
            </div>
          ))}
        </div>
        <h3 className="text-xl sm:text-2xl font-black text-center text-ink mb-6">QUY TẮC 6 KHÔNG</h3>
        <div className="rules-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 max-w-4xl mx-auto">
          {rules.map((rule, idx) => (
            <div key={idx} className="rule-item bg-white rounded-xl p-3.5 sm:p-4 shadow-sm border border-border flex items-center gap-3 hover:shadow-md transition-all">
              <div className="w-9 h-9 rounded-lg bg-danger/10 text-danger flex items-center justify-center flex-shrink-0">{rule.icon}</div>
              <p className="text-sm text-ink">{rule.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   SKILLS SECTION
   ═══════════════════════════════════════════ */
function SkillsSection() {
  const ref = useRef<HTMLElement>(null);
  const actions = [
    { title: 'KHI GẶP LỪA ĐẢO', color: 'bg-amber/10 border-amber/30', items: [{ icon: <PhoneOff className="w-4 h-4" />, text: 'CHỦ ĐỘNG NGẮT LIÊN LẠC ngay lập tức' }, { icon: <XCircle className="w-4 h-4" />, text: 'CHẶN TIN NHẮN/CUỘC GỌI từ số lạ' }, { icon: <Flag className="w-4 h-4" />, text: 'BÁO CÁO tại canhbao.khonggianmang.vn' }, { icon: <Megaphone className="w-4 h-4" />, text: 'CẢNH BÁO người thân, bạn bè' }] },
    { title: 'SAU KHI BỊ LỪA', color: 'bg-danger/10 border-danger/30', items: [{ icon: <XCircle className="w-4 h-4" />, text: 'DỪNG CHUYỂN TIỀN NGAY, đừng tiếp tục' }, { icon: <Landmark className="w-4 h-4" />, text: 'LIÊN HỆ NGÂN HÀNG yêu cầu khóa tài khoản' }, { icon: <Shield className="w-4 h-4" />, text: 'TRÌNH BÁO CÔNG AN gần nhất' }, { icon: <BookmarkCheck className="w-4 h-4" />, text: 'SAO LƯU lịch sử giao dịch, tin nhắn' }] },
    { title: 'KHI MẤT THÔNG TIN', color: 'bg-copper/10 border-copper/30', items: [{ icon: <RefreshCw className="w-4 h-4" />, text: 'ĐỔI MẬT KHẨU NGAY cho tất cả tài khoản' }, { icon: <ShieldCheck className="w-4 h-4" />, text: 'BẬT MÃ XÁC THỰC 2FA' }, { icon: <ScanLine className="w-4 h-4" />, text: 'QUÉT VIRUS toàn bộ thiết bị' }, { icon: <LockKeyhole className="w-4 h-4" />, text: 'THÔNG BÁO cho các dịch vụ liên quan' }] },
  ];
  const advanced = [
    'Bảo vệ thông tin cá nhân: Không chia sẻ CCCD, số điện thoại, địa chỉ trên mạng xã hội công khai',
    'Sử dụng mật khẩu mạnh: Tối thiểu 12 ký tự, kết hợp chữ hoa, chữ thường, số và ký tự đặc biệt',
    'Cập nhật phần mềm bảo mật: Luôn cập nhật hệ điều hành và ứng dụng lên phiên bản mới nhất',
    'Bật 2FA cho mọi tài khoản quan trọng: Ngân hàng, email, mạng xã hội, ví điện tử',
    'Sao lưu dữ liệu định kỳ: Đề phòng mã độc tống tiền (ransomware)',
    'Kiểm tra tài khoản định kỳ: Theo dõi giao dịch ngân hàng, thông báo bất thường',
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.act-card', { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6, stagger: 0.12, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 75%' } });
      gsap.fromTo('.adv-item', { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, stagger: 0.08, ease: 'power3.out', scrollTrigger: { trigger: '.adv-list', start: 'top 85%' } });
      gsap.fromTo('.skills-img', { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 75%' } });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="py-16 sm:py-20 bg-cream border-t border-border">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-16">
        <div className="text-center mb-10">
          <span className="inline-block bg-blue-500/10 text-blue-600 text-xs font-bold uppercase px-4 py-2 rounded-full mb-3">Kỹ năng thực hành</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-ink uppercase">KỸ NĂNG XỬ LÝ</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          <div className="space-y-3 sm:space-y-4">
            {actions.map((card, idx) => (
              <div key={idx} className={`act-card ${card.color} rounded-xl p-4 sm:p-5 border`}>
                <h3 className="font-bold text-sm uppercase mb-3">{card.title}</h3>
                <div className="space-y-2">
                  {card.items.map((item, i) => (
                    <div key={i} className="flex items-start gap-2 sm:gap-3 text-sm">
                      <span className="text-amber mt-0.5 flex-shrink-0">{item.icon}</span>
                      <span className="text-ink-light text-xs leading-relaxed">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {/* <div>
            <h3 className="font-bold text-base sm:text-lg uppercase mb-4 sm:mb-5">Kỹ Năng Phòng Tránh Nâng Cao</h3>
            <div className="adv-list space-y-2 sm:space-y-3">
              {advanced.map((skill, idx) => (
                <div key={idx} className="adv-item flex items-start gap-2 sm:gap-3">
                  <Diamond className="w-4 h-4 text-amber flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-ink-light leading-relaxed">{skill}</span>
                </div>
              ))}
            </div>
          </div> */}
          <div className="skills-img flex justify-center items-start h-auto relative overflow-hidden rounded-2xl">
            <img src="/images/section10(2)-devices.jpg" alt="2FA Protection" className=" absolute shadow-lg w-full max-w-xl top-[50%] translate-y-[-50%]" loading="lazy" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   MESSAGES SECTION
   ═══════════════════════════════════════════ */
function MessagesSection() {
  const ref = useRef<HTMLElement>(null);
  const msgs = [
    { num: 1, title: 'Lòng tham là cái bẫy lớn nhất', desc: '72.6% lừa đảo nhắm vào tài chính. Đối tượng lừa đảo luôn lợi dụng lòng tham, mong muốn giàu nhanh. Không có bữa trưa nào là miễn phí.', img: '/images/section11-treasure.jpg' },
    { num: 2, title: 'CHẬM LẠI — KIỂM TRA — DỪNG — KHÔNG GỬI', desc: 'Nguyên tắc vàng tự bảo vệ: Khi nhận yêu cầu chuyển tiền hay cung cấp thông tin, hãy chậm lại, kiểm tra, dừng nếu đáng ngờ.', img: '/images/section11-pause.jpg' },
    { num: 3, title: 'Không cán bộ nhà nước nào điều tra qua điện thoại', desc: 'Cơ quan công quyền không bao giờ gọi điện yêu cầu chuyển tiền. Gặp trường hợp này là lừa đảo 100%.', img: '/images/section11-government.jpg' },
    { num: 4, title: 'Tấn công tâm lý là vũ khí chính', desc: 'Lừa đảo trực tuyến không chỉ là công nghệ, mà là nghệ thuật đánh vào tâm lý: lòng tham, sợ hãi, tò mò.', img: '/images/section11-crystal.jpg' },
    { num: 5, title: 'Cảnh giác là lá chắn — Chia sẻ là trách nhiệm', desc: 'Khi phát hiện lừa đảo, hãy báo cáo tại canhbao.khonggianmang.vn và cảnh báo người thân.', img: '/images/section11-shield.jpg' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.msg-card', { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, stagger: 0.12, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 75%' } });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="py-16 sm:py-20 bg-ink text-white relative overflow-hidden">
      <FloatingParticles count={15} color="#C4882B" />
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-16">
        <div className="text-center mb-10">
          <span className="inline-block bg-amber/20 text-amber text-xs font-bold uppercase px-4 py-2 rounded-full mb-3">Thông điệp</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase">5 thông điệp cốt lõi bảo vệ cộng đồng</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-4 sm:mb-5">
          {msgs.slice(0, 3).map((msg) => (
            <div key={msg.num} className="msg-card bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-amber/40 transition-all group">
              <div className="h-32 sm:h-36 overflow-hidden">
                <img src={msg.img} alt={msg.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
              </div>
              <div className="p-4 sm:p-5">
                <div className="w-7 h-7 rounded-md bg-amber text-white flex items-center justify-center text-xs font-bold mb-2">{msg.num}</div>
                <h3 className="font-bold text-sm sm:text-base mb-2">{msg.title}</h3>
                <p className="text-white/60 text-xs leading-relaxed">{msg.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {msgs.slice(3, 5).map((msg) => (
            <div key={msg.num} className="msg-card bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-amber/40 transition-all group flex">
              <div className="w-2/5 overflow-hidden">
                <img src={msg.img} alt={msg.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
              </div>
              <div className="w-3/5 p-4 sm:p-5">
                <div className="w-7 h-7 rounded-md bg-amber text-white flex items-center justify-center text-xs font-bold mb-2">{msg.num}</div>
                <h3 className="font-bold text-sm sm:text-base mb-2">{msg.title}</h3>
                <p className="text-white/60 text-xs leading-relaxed">{msg.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   ACTION CTA SECTION
   ═══════════════════════════════════════════ */
function ActionSection() {
  const ref = useRef<HTMLElement>(null);
  const actions = [
    { num: 1, title: 'ĐỐI VỚI CÁ NHÂN', img: '/images/section12-safe.jpg', items: ['Không cho mượn tài khoản ngân hàng dưới bất kỳ lý do nào', "Cảnh giác 'việc nhẹ lương cao', 'đầu tư không rủi ro'", 'Bảo vệ thông tin cá nhân như bảo vệ tiền bạc', 'Kích hoạt bảo mật 2 lớp (2FA) cho mọi tài khoản', 'Không click link, tải file từ nguồn không xác định'] },
    { num: 2, title: 'ĐỐI VỚI CỘNG ĐỒNG', img: '/images/section12-community.jpg', items: ['Chia sẻ kiến thức phòng chống lừa đảo cho người thân, người lớn tuổi', 'Không chế giễu nạn nhân - sự thông cảm giúp họ lên tiếng', 'Tích cực báo cáo vụ lừa đảo cho cơ quan chức năng', 'Cùng nhau xây dựng cộng đồng cảnh giác, an toàn'] },
    { num: 3, title: 'ĐỐI VỚI CHÍNH SÁCH', img: '/images/section12-book.jpg', items: ['Tăng cường giáo dục an toàn mạng tại vùng nông thôn, miền núi', 'Hỗ trợ pháp lý miễn phí cho nạn nhân có hoàn cảnh khó khăn', 'Xây dựng cơ chế bảo vệ nạn nhân, khuyến khích tố giác', 'Tăng cường hợp tác quốc tế truy bắt tội phạm xuyên biên giớii'] },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.action-col', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 75%' } });
      gsap.fromTo('.action-quote', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.4, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 75%' } });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="py-16 sm:py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-16">
        <div className="text-center mb-10">
          <span className="inline-block bg-amber/10 text-amber text-xs font-bold uppercase px-4 py-2 rounded-full mb-3">Hành động</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-ink">
            <span className="border-b-4 border-amber pb-1">Hành động ngay hôm nay</span>
          </h2>
          <p className="text-ink-light mt-3 max-w-2xl mx-auto text-sm">
            Phòng chống lừa đảo không chỉ là việc của cá nhân, mà là trách nhiệm của toàn xã hội.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {actions.map((item) => (
            <div key={item.num} className="action-col bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-border hover:shadow-lg transition-all">
              <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-5">
                <img src={item.img} alt={item.title} className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl object-cover shadow-sm" loading="lazy" />
                <div>
                  <span className="text-amber font-bold text-sm">{item.num}.</span>
                  <h3 className="font-bold text-sm uppercase">{item.title}</h3>
                </div>
              </div>
              <ul className="space-y-2 sm:space-y-3">
                {item.items.map((text, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-ink-light">
                    <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                    <span className="text-xs leading-relaxed">{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="action-quote mt-8 sm:mt-10 bg-gradient-to-r from-amber/20 via-copper/20 to-amber/20 border-l-4 border-amber rounded-r-xl p-5 sm:p-6 max-w-4xl mx-auto">
          <p className="text-center font-bold text-ink leading-relaxed text-sm sm:text-base">
            "Thông tin cá nhân, danh dự và tự do của bạn đều là mục tiêu — không chỉ tiền bạc. Phòng chống lừa đảo là trách nhiệm của <span className="text-amber">mỗi người</span>."
          </p>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   TEAM SECTION - THÀNH VIÊN NHÓM (POPUP)
   ═══════════════════════════════════════════ */
function TeamSection() {
  const ref = useRef<HTMLElement>(null);
  const [openTeam, setOpenTeam] = useState(false);

  const members = [
    { name: 'Vũ Đức Minh', initials: 'VDM', color: 'from-amber to-amber-dark', emoji: '👤' },
    { name: 'Nguyễn Hoài An', initials: 'NHA', color: 'from-emerald-400 to-emerald-600', emoji: '👤' },
    { name: 'Nguyễn Thái Sơn Lâm', initials: 'NTSL', color: 'from-copper to-copper-dark', emoji: '👤' },
    { name: 'Trần Quốc Bảo', initials: 'TQB', color: 'from-violet-400 to-violet-600', emoji: '👤' },
    { name: 'Huỳnh Tấn An', initials: 'HTA', color: 'from-sky-400 to-sky-600', emoji: '👤' },
    { name: 'Phạm Thái Nhật Anh', initials: 'PTNA', color: 'from-pink-400 to-pink-600', emoji: '👤' },
    { name: 'Ka Lục Nguyệt', initials: 'KLN', color: 'from-rose-400 to-rose-600', emoji: '👤' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.team-trigger', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 80%' } });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <section ref={ref} id="team" className="py-16 sm:py-20 bg-gradient-to-br from-ink via-[#2a2420] to-ink text-white relative overflow-hidden">
        <FloatingParticles count={20} color="#C4882B" />
        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-16">
          <div className="team-trigger text-center">
            <span className="inline-block bg-amber/20 text-amber text-xs font-bold uppercase px-4 py-2 rounded-full mb-3">Đội ngũ</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase mb-3">THÀNH VIÊN NHÓM</h2>
            <p className="text-white/50 max-w-xl mx-auto text-sm mb-8">
              Nhóm 7 sinh viên thực hiện dự án giáo dục phòng chống lừa đảo trực tuyến.
            </p>

            {/* Click to open popup */}
            <button
              onClick={() => setOpenTeam(true)}
              className="group inline-flex items-center gap-4 bg-white/5 backdrop-blur-sm rounded-2xl px-8 py-5 border border-amber/30 hover:border-amber/60 hover:bg-white/10 transition-all duration-300 cursor-pointer"
            >
              <div className="flex -space-x-3">
                {members.slice(0, 4).map((m, i) => (
                  <div key={i} className={`w-10 h-10 rounded-full bg-gradient-to-br ${m.color} flex items-center justify-center text-white text-xs font-bold border-2 border-ink shadow-md`}>
                    {m.initials[0]}
                  </div>
                ))}
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-amber text-xs font-bold border-2 border-ink shadow-md">
                  +3
                </div>
              </div>
              <div className="text-left">
                <p className="font-bold text-sm group-hover:text-amber transition-colors">Xem danh sách thành viên</p>
                <p className="text-white/40 text-xs">Click để mở</p>
              </div>
              <ChevronRight className="w-5 h-5 text-amber group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="mt-10 sm:mt-12 bg-white/5 rounded-2xl p-5 sm:p-6 border border-white/10 text-center max-w-2xl mx-auto">
            <Users className="w-8 h-8 text-amber mx-auto mb-3" />
            <p className="text-white/70 text-sm italic">
              "Cùng nhau nâng cao nhận thức cộng đồng về phòng chống lừa đảo trực tuyến."
            </p>
          </div>
        </div>
      </section>

      {/* Team Dialog Popup */}
      <Dialog open={openTeam} onOpenChange={setOpenTeam}>
        <DialogContent style={{ width: '80vw', maxWidth: 'none' }} className="w-[80vw] max-h-[90vh] bg-gradient-to-br from-ink via-[#2a2420] to-ink border-white/20 text-white overflow-x-hidden">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-amber/20 flex items-center justify-center">
                  <Users className="w-6 h-6 text-amber" />
                </div>
                <div>
                  <DialogTitle className="text-xl sm:text-2xl font-black text-white uppercase">Thành viên nhóm</DialogTitle>
                  <DialogDescription className="text-white/50 text-xs">7 thành viên thực hiện dự án</DialogDescription>
                </div>
              </div>
            </div>
          </DialogHeader>

          <div className="mt-6">
            <p className="text-white/60 text-sm text-center mb-6">
              Nhóm sinh viên thực hiện dự án giáo dục phòng chống lừa đảo trực tuyến
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {members.map((member, idx) => (
                <div key={idx} className="bg-white/5 rounded-xl p-4 border border-white/10 hover:border-white/30 hover:bg-white/10 transition-all duration-300 text-center group">
                  <div className={`w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 rounded-full bg-gradient-to-br ${member.color} flex items-center justify-center text-white text-lg sm:text-xl font-black shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {member.initials}
                  </div>
                  <h3 className="font-bold text-sm">{member.name}</h3>
                </div>
              ))}
            </div>
          </div>

        </DialogContent>
      </Dialog>
    </>
  );
}

/* ═══════════════════════════════════════════
   SUPPORT ECHOSYSTEM
   ═══════════════════════════════════════════ */

export function SupportEcosystemSection() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hiệu ứng trượt nhẹ từ 2 phía cho hai khối hệ sinh thái hỗ trợ
      gsap.fromTo('.ecosystem-left',
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
          }
        }
      );

      gsap.fromTo('.ecosystem-right',
        { x: 30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-16 sm:py-24 bg-cream border-t border-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-16">

        {/* Tiêu đề lớn định hình thông điệp */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-[10px] font-bold tracking-widest text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md inline-block uppercase">
            Điểm tựa an toàn số
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-ink uppercase tracking-tight">
            Bạn Không Hề Đơn Độc Trên Không Gian Mạng
          </h2>
          <p className="text-sm text-ink-light leading-relaxed">
            Nhà nước đã xây dựng một hệ sinh thái hỗ trợ và bảo vệ vô cùng mạnh mẽ. Khi đối mặt với các nguy cơ lừa đảo trực tuyến, bạn luôn có sự đồng hành sát sao từ các cơ quan pháp lý và các công cụ cứu hộ chính thống.
          </p>
        </div>

        {/* Bố cục 2 khối lớn đối xứng: Pháp lý An ninh vs Công cụ Cứu hộ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

          {/* KHỐI TRÁI: LÁ CHẮN PHÁP LÝ & AN NINH (6 Cột) */}
          <div className="ecosystem-left lg:col-span-6 bg-white border border-border rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b border-border/60 pb-4">
                <div className="p-2.5 rounded-xl bg-ink text-white flex-shrink-0">
                  <Landmark className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-sm sm:text-base text-ink uppercase tracking-wide">
                    Hệ Thống Pháp Lý & An Ninh Mạng
                  </h3>
                  <p className="text-[11px] text-ink-muted">Các lực lượng chuyên trách luôn túc trực bảo vệ an ninh quốc gia số</p>
                </div>
              </div>

              {/* Danh sách 3 cơ quan đầu não */}
              <div className="space-y-4">
                <div className="flex gap-3.5 items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-600 mt-2 flex-shrink-0" />
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-ink uppercase tracking-wide">Cục An ninh mạng & Phòng chống tội phạm công nghệ cao (A05)</h4>
                    <p className="text-xs text-ink-light leading-relaxed">Lực lượng mũi nhọn thuộc Bộ Công an, chuyên trách điều tra, triệt phá các đường dây lừa đảo, tấn công mạng và tội phạm công nghệ cao.</p>
                  </div>
                </div>

                <div className="flex gap-3.5 items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-600 mt-2 flex-shrink-0" />
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-ink uppercase tracking-wide">Cục An toàn thông tin (AIS)</h4>
                    <p className="text-xs text-ink-light leading-relaxed">Cơ quan điều phối quốc gia thuộc Bộ Thông tin và Truyền thông, chuyên giám sát, cảnh báo sớm và ngăn chặn các website, đường link độc hại.</p>
                  </div>
                </div>

                <div className="flex gap-3.5 items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-600 mt-2 flex-shrink-0" />
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-ink uppercase tracking-wide">Bộ Tư lệnh Tác chiến Không gian mạng (Bộ Tư lệnh 86)</h4>
                    <p className="text-xs text-ink-light leading-relaxed">Đơn vị tinh nhuệ thuộc Bộ Quốc phòng, thực hiện nhiệm vụ bảo vệ chủ quyền quốc gia trên không gian mạng và tác chiến phòng thủ số.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-border/60 flex items-center gap-2 text-[11px] text-red-600 font-bold">
              <ShieldCheck className="w-4 h-4 text-red-600" />
              <span>Lực lượng chức năng luôn sẵn sàng tiếp nhận thông tin và xử lý vi phạm.</span>
            </div>
          </div>

          {/* KHỐI PHẢI: TRUNG TÂM CÔNG CỤ CỨU HỘ (6 Cột) */}
          <div className="ecosystem-right lg:col-span-6 bg-white border border-border rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b border-border/60 pb-4">
                <div className="p-2.5 rounded-xl bg-amber text-white flex-shrink-0">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-sm sm:text-base text-ink uppercase tracking-wide">
                    Cổng Công Cụ Cứu Hộ Trực Tuyến
                  </h3>
                  <p className="text-[11px] text-ink-muted">Địa chỉ tiếp nhận thông tin phản ánh và hướng dẫn xử lý sự cố tức thì</p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-ink-light leading-relaxed">
                Bất cứ lúc nào khi bạn nghi ngờ mình đang bị thao túng, phát hiện dấu hiệu lừa đảo, hoặc không may đã xảy ra sự cố sập bẫy tài chính, hãy truy cập ngay các nền tảng quốc gia dưới đây để nhận hỗ trợ khẩn cấp:
              </p>

              {/* 2 Nút link liên kết trực quan lớn */}
              <div className="space-y-3 pt-2">
                <a
                  href="https://khonggianmang.vn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 bg-cream/30 hover:bg-cream/70 border border-border/80 rounded-xl group transition-all"
                >
                  <div className="space-y-0.5 pr-4">
                    <span className="text-xs font-black text-ink uppercase tracking-wide flex items-center gap-1.5">
                      Khonggianmang.vn
                    </span>
                    <p className="text-[11px] text-ink-muted">Cổng thông tin thuộc Trung tâm Giám sát an toàn không gian mạng quốc gia (NCSC).</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-ink-light group-hover:text-amber group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                </a>

                <a
                  href="https://canhbao.khonggianmang.vn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 bg-red-50/20 hover:bg-red-50/50 border border-red-100 rounded-xl group transition-all"
                >
                  <div className="space-y-0.5 pr-4">
                    <span className="text-xs font-black text-red-600 uppercase tracking-wide flex items-center gap-1.5">
                      canhbao.khonggianmang.vn
                    </span>
                    <p className="text-[11px] text-ink-muted">Trang chuyên dụng để người dân báo cáo trực tiếp các website, số điện thoại hoặc tài khoản lừa đảo.</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-red-400 group-hover:text-red-600 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                </a>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-border/60 flex items-center gap-2 text-[11px] text-ink-muted">
              <HelpCircle className="w-4 h-4 text-amber" />
              <span>Hãy lưu hoặc chia sẻ hai địa chỉ này cho người thân để phòng bị khi cần thiết.</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════ */
export default function Home() {
  const [showNav, setShowNav] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // 1. Extend the timeline array to specify alignment types
  // scrollToSection(['music-video', 'introduction', 'fraud-types', 'spotting', 'resolving', 'preventative', 'supports', 'scenario', 'rebuttal', 'poster', 'team'][i])}
  const timeline: any[] = [
    { slideId: 'music-video', revealLevel: 0, align: 'start' }, // Smaller slide -> Center view

    { slideId: 'introduction', revealLevel: 0, align: 'center' }, // Top of container hits top of screen
    { slideId: 'introduction02', revealLevel: 0, align: 'center' }, // Bottom of container hits bottom of screen

    { slideId: 'fraud-types', revealLevel: 0, align: 'start' },

    { slideId: 'accordion-group-1', action: 'open-group-1', align: 'center' },
    { slideId: 'accordion-group-2', action: 'open-group-2', align: 'center' },
    { slideId: 'accordion-group-3', action: 'open-group-3', align: 'center' },

    { slideId: 'spotting', revealLevel: 0, align: 'start' },
    { slideId: 'spotting', revealLevel: 1, align: 'center' },
    { slideId: 'spotting', revealLevel: 2, align: 'end' },

    { slideId: 'spotting02', revealLevel: 0, align: 'start' },
    { slideId: 'spotting02', revealLevel: 1, align: 'center' },
    { slideId: 'spotting02', revealLevel: 2, align: 'end' },

    { slideId: 'resolving', revealLevel: 0, align: 'start' },
    { slideId: 'resolving', revealLevel: 1, align: 'center' },
    { slideId: 'resolving', revealLevel: 2, align: 'end' },
    { slideId: 'preventative', revealLevel: 0, align: 'start' },
    { slideId: 'preventative', revealLevel: 1, align: 'end' },
    { slideId: 'supports', revealLevel: 0, align: 'start' },
    { slideId: 'supports', revealLevel: 1, align: 'end' },
    { slideId: 'scenario', revealLevel: 0, align: 'center' },
    { slideId: 'rebuttal', revealLevel: 0, align: 'start' },
    { slideId: 'poster', revealLevel: 0, align: 'center' },
    { slideId: 'team', revealLevel: 0, align: 'start' },

  ];

  const [currentStep, setCurrentStep] = useState(0);
  const activeTimelineItem = timeline[currentStep];

  // Guard flag to prevent scroll listeners from fighting click triggers during transit
  const isNavigatingRef = useRef(false);

  // 1. Track physical section entry via Intersection Observer
  useEffect(() => {
    const observerOptions = {
      root: null, // monitors the viewport window
      threshold: 0.4, // triggers when 40% of the target section is visible
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      // If a programmatic jump click is running, ignore natural scroll updates temporarily
      if (isNavigatingRef.current) return;

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const visibleId = entry.target.id;

          // Find the first matching item in our array sequence matching this element ID
          const matchingIndex = timeline.findIndex(item => item.slideId === visibleId);
          if (matchingIndex !== -1) {
            setCurrentStep(matchingIndex);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Connect observer targets
    ['music-video', 'introduction', 'fraud-types', 'spotting', 'resolving', 'preventative', 'supports', 'scenario', 'rebuttal', 'poster', 'team'].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavigation = (e: React.MouseEvent) => {
    if (e.target instanceof HTMLElement && (e.target.tagName === 'BUTTON' || e.target.tagName === 'VIDEO' || e.target.closest('button'))) {
      return;
    }

    if (e.button === 0) { // Left Click -> Forward
      if (currentStep < timeline.length - 1) {
        goToStep(currentStep + 1);
      } else {
        goToStep(0);
      }
    } else if (e.button === 2) { // Right Click -> Backward
      e.preventDefault();
      if (currentStep > 0) {
        goToStep(currentStep - 1);
      } else {
        // 🚀 NEW REVERSE BEHAVIOR: 
        // If we are at Step 0 (the top) and right-click, wrap around to the very last step (the bottom)!
        goToStep(timeline.length - 1);
      }
    }
  };

  const goToStep = (stepIndex: number) => {
    isNavigatingRef.current = true;
    setCurrentStep(stepIndex);

    const targetTimelineItem = timeline[stepIndex];

    setTimeout(() => {
      const targetElement = document.getElementById(targetTimelineItem.slideId);
      if (targetElement) {

        // 🚀 FIX: If it's an accordion item, give Radix a moment to expand 
        // its height before calculating the screen center coordinate layout!
        const isAccordion = targetTimelineItem.slideId.includes('accordion');

        setTimeout(() => {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: targetTimelineItem.align,
          });

          // Restore manual scrolling tracking after smooth navigation ends
          setTimeout(() => {
            isNavigatingRef.current = false;
          }, 1500);
        }, isAccordion ? 180 : 0); // 180ms delay gives the slideDown layout a head start

      } else {
        isNavigatingRef.current = false;
      }
    }, 0);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    ScrollTrigger.refresh();

    const handleScroll = () => {
      setShowNav(window.scrollY > 500);
      setShowScrollTop(window.scrollY > 1000);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      onMouseDown={handleNavigation}
      onContextMenu={(e) => e.preventDefault()}
      // 🚀 Changed from overflow-hidden to h-screen overflow-y-auto to restore normal scrolling!
      className="w-full min-h-screen bg-slate-950 scroll-smooth"
    >

      <main className="bg-cream">
        {/* Floating Navigation */}
        {showNav && (
          <nav className="fixed top-0 left-0 right-0 z-50 bg-ink/95 backdrop-blur-sm text-white py-3 px-4 sm:px-8 shadow-lg transition-all">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <span className="font-bold text-sm uppercase hidden sm:block">Phòng Chống Lừa Đảo</span>
              <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto text-xs">
                {['Music Video', 'Tổng Quan', 'Hình thức', 'Nhận biết', 'Xử Lý', 'Phòng Tránh - Nguyên tắc', 'Truyền thông', 'Tình Huống', 'Chủ quan', 'Poster', 'Thành viên'].map((label, i) => (
                  <button key={i} onClick={() => scrollToSection(['music-video', 'introduction', 'fraud-types', 'spotting', 'resolving', 'preventative', 'supports', 'scenario', 'rebuttal', 'poster', 'team'][i])} className="hover:text-amber transition-colors whitespace-nowrap">
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </nav>
        )}

        <div id="music-video"><VideoSection /></div>
        <div id="introduction"><HeroSection /></div>
        <div id="introduction02"><StatsSection /></div>
        <div id="fraud-types"><FraudScenariosAccordion activeAction={activeTimelineItem?.action} /></div>
        {/* <div id="psychology"><PsychologySection /></div> */}
        <div id="spotting"><ChannelsSection /></div>
        <div id="spotting02"><PsychologicalManipulationSection /></div>
        {/* <VictimsSection /> */}
        {/* <PoorPeopleSection /> */}
        {/* <div id="resolving">
      <ActionSection />
      </div> */}
        <div id="resolving"><SkillsSection /></div>
        <div id="preventative"><GoldenRulesSection /></div>
        <div id="supports"><SupportEcosystemSection /></div>
        {/* <MessagesSection /> */}
        <div id="scenario"><ScenarioVideoSection /></div>
        <div id="rebuttal">
          <RebuttalSection />
        </div>
        <div id="poster"><PosterSection /></div>
        <TeamSection />

        {/* Scroll to top */}
        {showScrollTop && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-amber text-white rounded-full shadow-lg flex items-center justify-center hover:bg-amber-dark transition-colors"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}

        {/* Footer */}
        <footer className="bg-ink text-white py-10 sm:py-12">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
              <div>
                <h4 className="font-bold text-base sm:text-lg mb-3">NHẬN DIỆN & PHÒNG CHỐNG LỪA ĐẢO</h4>
                <p className="text-white/50 text-sm leading-relaxed">
                  Website giáo dục cộng đồng về nhận diện và phòng chống lừa đảo trực tuyến, dựa trên Sổ Tay Kỹ Năng của Cục An toàn thông tin.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-sm uppercase mb-3">Liên kết hữu ích</h4>
                <ul className="space-y-2 text-sm text-white/50">
                  <li><a href="https://canhbao.khonggianmang.vn" target="_blank" rel="noopener noreferrer" className="hover:text-amber transition-colors">canhbao.khonggianmang.vn</a></li>
                  <li><a href="https://www.antoanthongtin.vn" target="_blank" rel="noopener noreferrer" className="hover:text-amber transition-colors">antoanthongtin.vn</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-sm uppercase mb-3">Số điện thoại khẩn cấp</h4>
                <ul className="space-y-2 text-sm text-white/50">
                  <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-amber" /> Công an: 113</li>
                  <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-amber" /> Cục An ninh mạng: 069.219.4053</li>
                </ul>
              </div>
            </div>
            <div className="border-t border-white/10 pt-6 text-center">
              <p className="text-white/40 text-xs">
                Nguồn: Sổ Tay Kỹ Năng Nhận diện & Phòng chống Lừa đảo Trực tuyến | Cục An toàn thông tin - Bộ TT&TT
              </p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
