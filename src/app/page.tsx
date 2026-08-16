"use client";

import { useMemo, useState } from "react";

type View = "network" | "roadmap" | "signals";
type NodeKey = "core" | "power" | "people" | "supplier" | "capital" | "digital" | "climate" | "industry" | "ai" | "food" | "logistics";

const nodeData: Record<NodeKey, {label:string; group:"base"|"bridge"|"outcome"; x:number;y:number; title:string; thesis:string; evidence:string; action:string; source?:string}> = {
  core:{label:"Năng lực quốc gia",group:"outcome",x:50,y:47,title:"Năng lực quốc gia",thesis:"Tăng sản lượng chưa đủ. Năng lực là phần kiến thức, hạ tầng, tổ chức và quyền sở hữu còn lại sau mỗi chu kỳ tăng trưởng.",evidence:"Xuất khẩu lớn không tự chứng minh giá trị nội địa, IP hay năng lực thiết kế.",action:"Đo giá trị giữ lại, năng suất và khả năng chống sốc — không chỉ GDP.",source:"https://www.worldbank.org/vi/country/vietnam/publication/viet-nam-2045-trading-up-in-a-changing-world"},
  power:{label:"Điện · lưới · lưu trữ",group:"base",x:20,y:23,title:"Điện đáng tin cậy",thesis:"Điện là điều kiện vận hành của điện tử, AI, logistics lạnh và sản xuất chính xác; chất lượng điện quan trọng ngang công suất.",evidence:"Điện tạo hiệu ứng lan tỏa sang thiết bị, cáp, điện tử công suất, pin và phần mềm quản lý lưới.",action:"Ưu tiên truyền tải, điều độ, lưu trữ, hiệu suất và độ tin cậy theo vùng.",source:"https://baochinhphu.vn/phe-duyet-quy-hoach-phat-trien-dien-luc-quoc-gia-thoi-ky-2021-2030-102230516150332925.htm"},
  people:{label:"Kỹ thuật · quản trị · R&D",group:"base",x:57,y:18,title:"Bộ chuyển đổi tri thức",thesis:"Kỹ thuật viên vận hành máy; quản trị biến kỹ năng thành năng suất; R&D ứng dụng biến lỗi và dữ liệu thành công nghệ.",evidence:"28,3% lao động có bằng/chứng chỉ năm 2024, nhưng chỉ báo này không đo năng lực vận hành và cải tiến thực tế.",action:"Đào tạo theo đơn hàng cụm ngành và đo đầu ra bằng lỗi, downtime, năng suất, sản phẩm mới.",source:"https://www.nso.gov.vn/en/highlight/2025/02/socio-economic-situation-in-the-fourth-quarter-and-2024/"},
  supplier:{label:"Nhà cung ứng nội địa",group:"bridge",x:79,y:39,title:"Liên kết FDI → nội địa",thesis:"FDI chỉ lan tỏa khi doanh nghiệp Việt có đơn hàng, tiêu chuẩn, kỹ sư, vốn chuỗi cung ứng và quyền giải bài toán kỹ thuật.",evidence:"Tỷ lệ doanh nghiệp trong nước tham gia chuỗi giá trị toàn cầu được World Bank ước tính giảm từ 35% năm 2009 xuống 18% năm 2023.",action:"Chương trình nhà cung ứng theo ngành với khách hàng neo và KPI doanh thu, chất lượng, xuất khẩu.",source:"https://www.worldbank.org/vi/country/vietnam/publication/viet-nam-2045-trading-up-in-a-changing-world"},
  capital:{label:"Vốn dài hạn",group:"bridge",x:22,y:63,title:"Vốn kiên nhẫn",thesis:"Cấu trúc vốn ngắn hạn và dựa vào tài sản thế chấp kéo doanh nhân về tài sản hữu hình, rời xa R&D và B2B công nghiệp.",evidence:"Khoảng lệch này là phản ứng hợp lý với cấu trúc thưởng, không phải do doanh nhân thiếu tham vọng.",action:"Supply-chain finance, mua sắm đổi mới, vốn tăng trưởng và cơ chế chia sẻ rủi ro.",source:"https://app.notion.com/p/3bd0f51ede8b803c87c8c26bcbe4def2"},
  digital:{label:"Dữ liệu · test · tiêu chuẩn",group:"base",x:50,y:77,title:"Hạ tầng vô hình",thesis:"Phòng test, dữ liệu dùng chung, đo lường và chứng nhận giúp SME vượt rào cản chất lượng mà từng doanh nghiệp không thể tự đầu tư.",evidence:"Đây là lớp kết nối giữa kỹ năng cá nhân và khả năng giao hàng theo chuẩn quốc tế.",action:"Xây trung tâm dùng chung sát cụm ngành; công khai dữ liệu chất lượng và nhu cầu kỹ năng.",source:"https://app.notion.com/p/3bd0f51ede8b803c87c8c26bcbe4def2"},
  climate:{label:"Chống chịu khí hậu",group:"base",x:80,y:72,title:"Khí hậu là biến số năng suất",thesis:"Nhiệt, ngập, hạn và xâm nhập mặn tác động đồng thời lên lao động, điện, logistics, nông nghiệp và địa lý sản xuất.",evidence:"Chống chịu không phải chi phí phụ; nó bảo vệ tài sản, thời gian vận hành và khả năng bảo hiểm.",action:"Định giá rủi ro theo vùng và đưa chống chịu vào mọi quyết định hạ tầng 10 năm.",source:"https://www.worldbank.org/en/country/vietnam/publication/vietnam-country-climate-and-development-report"},
  industry:{label:"Điện tử · tự động hóa",group:"outcome",x:70,y:58,title:"Nâng cấp công nghiệp",thesis:"Lợi thế kế tiếp không nằm ở lắp ráp nhiều hơn mà ở thiết kế quy trình, tự động hóa, kiểm thử, đóng gói và dịch vụ kỹ thuật.",evidence:"Khu vực FDI chiếm 71,7% xuất khẩu hàng hóa năm 2024 — quy mô lớn nhưng liên kết nội địa còn mỏng.",action:"Chọn cụm có khách hàng sẵn, phát triển tier 1/2 và năng lực kiểm thử–tự động hóa.",source:"https://www.gso.gov.vn/du-lieu-va-so-lieu-thong-ke/2025/01/buc-tranh-xuat-nhap-khau-hang-hoa-cua-viet-nam-nam-2024-phuc-hoi-phat-trien-va-nhung-ky-luc-moi/"},
  ai:{label:"Phần mềm B2B · AI ngành",group:"outcome",x:40,y:33,title:"AI là công nghệ ngang",thesis:"AI đứng riêng không tạo lợi thế quốc gia. Giá trị chỉ ở lại khi gắn với dữ liệu độc quyền, quy trình ngành và khả năng triển khai.",evidence:"Ứng dụng tiêu dùng dễ đo lượt dùng; B2B công nghiệp khó bán hơn nhưng tạo tài sản tri thức bền hơn.",action:"Tập trung AI cho sản xuất, logistics, năng lượng, nông nghiệp và y tế.",source:"https://app.notion.com/p/3bd0f51ede8b803c87c8c26bcbe4def2"},
  food:{label:"Thực phẩm · chuỗi lạnh",group:"outcome",x:29,y:43,title:"Giữ giá trị từ nông nghiệp",thesis:"Lợi thế tự nhiên chỉ chuyển thành giá trị khi có truy xuất, chuỗi lạnh, chế biến, biotech, tiêu chuẩn và thương hiệu.",evidence:"Thiếu hạ tầng chung khiến doanh nghiệp chọn trung gian thương mại ngắn hạn thay vì nâng cấp dài hạn.",action:"Xây cold chain theo vùng, chuẩn truy xuất và khách hàng xuất khẩu neo.",source:"https://app.notion.com/p/3bd0f51ede8b803c87c8c26bcbe4def2"},
  logistics:{label:"Logistics · hàng hải",group:"outcome",x:61,y:87,title:"Hệ tuần hoàn của nền kinh tế",thesis:"Cảng, vận tải đa phương thức và dịch vụ hàng hải quyết định thời gian, tồn kho và độ tin cậy của mọi cụm xuất khẩu.",evidence:"Logistics có lan tỏa cao nhưng giá trị giữ lại phụ thuộc dịch vụ kỹ thuật, dữ liệu và năng lực điều phối.",action:"Nối cảng–đường sắt–kho lạnh–dữ liệu; đo lead time thay vì chỉ công suất.",source:"https://app.notion.com/p/3bd0f51ede8b803c87c8c26bcbe4def2"},
};

const links: [NodeKey,NodeKey,string][] = [
  ["power","industry","cho phép"],["people","industry","nâng cấp"],["people","supplier","chuyển giao"],["capital","supplier","tài trợ"],["digital","supplier","đạt chuẩn"],["supplier","industry","giữ giá trị"],["ai","industry","tăng năng suất"],["power","ai","hạ tầng"],["climate","power","chống sốc"],["climate","food","bảo vệ"],["digital","food","truy xuất"],["logistics","food","kết nối"],["digital","logistics","điều phối"],["capital","power","đầu tư"],["industry","core","tích lũy"],["food","core","tích lũy"],["logistics","core","tích lũy"],["supplier","core","nội địa hóa"]
];

const roadmap = [
  {period:"2026–2028",label:"Gỡ điểm nghẽn",items:["Lưới điện & độ tin cậy theo vùng","Chương trình nhà cung ứng có khách hàng neo","Đào tạo kỹ thuật theo đơn hàng","Test, đo lường, chứng nhận dùng chung"]},
  {period:"2029–2032",label:"Nâng cấp vị trí",items:["Thiết kế, kiểm thử, tự động hóa","Supply-chain finance quy mô lớn","AI ngành và dữ liệu sản xuất","Cold chain & logistics đa phương thức"]},
  {period:"2033–2036",label:"Sở hữu năng lực",items:["Sản phẩm/IP của doanh nghiệp Việt","R&D có khách hàng và doanh thu","Cụm ngành chống chịu khí hậu","Dịch vụ kỹ thuật xuất khẩu"]},
];

const signals = [
  {name:"Nhà cung ứng Việt đạt chuẩn tier 1/2",why:"Đo liên kết thật, không đo cam kết FDI",direction:"↑"},
  {name:"Doanh thu sản phẩm/quy trình mới",why:"Đo R&D đã gặp khách hàng",direction:"↑"},
  {name:"Thời gian dừng máy & chi phí mất điện",why:"Đo chất lượng hạ tầng tại điểm sản xuất",direction:"↓"},
  {name:"Tỷ lệ giá trị gia tăng nội địa",why:"Đo phần nền kinh tế giữ lại",direction:"↑"},
  {name:"Lead time logistics theo hành lang",why:"Đo năng lực phối hợp hệ thống",direction:"↓"},
  {name:"Kỹ thuật viên lên quản lý/nhà sáng lập",why:"Đo tri thức đã lan khỏi nhà máy FDI",direction:"↑"},
];

export default function Home() {
  const [view,setView] = useState<View>("network");
  const [selected,setSelected] = useState<NodeKey>("core");
  const [group,setGroup] = useState<"all"|"base"|"bridge"|"outcome">("all");
  const current=nodeData[selected];
  const visible=useMemo(()=>Object.entries(nodeData).filter(([,n])=>group==="all"||n.group===group) as [NodeKey,typeof current][],[group]);
  return <main className="shell">
    <aside className="rail">
      <div className="brand"><span>VN</span> / NĂNG LỰC <b>2026—2036</b></div>
      <div className="eyebrow">BẢN ĐỒ HỆ THỐNG · VIỆT NAM</div>
      <h1>Không chỉ tăng sản lượng.<br/><em>Phải tích lũy năng lực.</em></h1>
      <p className="lede">Đọc nền kinh tế như một hệ thống: điều gì cho phép điều gì, điểm nghẽn nằm đâu, và năng lực nào phải nằm lại sau 10 năm.</p>
      <div className="metricRow"><div><strong>71,7%</strong><span>xuất khẩu hàng hóa từ FDI · 2024</span></div><div><strong>28,3%</strong><span>lao động có bằng/chứng chỉ · 2024</span></div></div>
      <div className="sourceFlag"><i/> Dữ liệu, suy luận và giả thuyết được tách rõ. Bấm từng nút để xem bằng chứng.</div>
      <nav aria-label="Chế độ xem">
        <button className={view==="network"?"active":""} onClick={()=>setView("network")}>Mạng lưới</button>
        <button className={view==="roadmap"?"active":""} onClick={()=>setView("roadmap")}>Lộ trình 10 năm</button>
        <button className={view==="signals"?"active":""} onClick={()=>setView("signals")}>Chỉ dấu sớm</button>
      </nav>
    </aside>
    <section className="workspace">
      <header><div><b>{view==="network"?"BỨC TRANH CHUNG":view==="roadmap"?"2026 → 2036":"HỆ ĐO LƯỜNG"}</b><span>{view==="network"?"11 nút · 18 quan hệ":view==="roadmap"?"3 chặng · 1 logic tích lũy":"6 tín hiệu cần theo dõi"}</span></div><a href="https://app.notion.com/p/3bd0f51ede8b803c87c8c26bcbe4def2" target="_blank" rel="noreferrer">Nguồn nghiên cứu ↗</a></header>
      {view==="network"&&<div className="networkLayout">
        <div className="canvas" aria-label="Bản đồ quan hệ năng lực quốc gia">
          <div className="filters" role="group" aria-label="Lọc nút">{(["all","base","bridge","outcome"] as const).map(v=><button key={v} className={group===v?"on":""} onClick={()=>setGroup(v)}>{v==="all"?"Tất cả":v==="base"?"Nền tảng":v==="bridge"?"Cầu nối":"Cụm kết quả"}</button>)}</div>
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">{links.map(([a,b],i)=>{const A=nodeData[a],B=nodeData[b];return <line key={i} className={selected===a||selected===b?"hot":""} x1={A.x} y1={A.y} x2={B.x} y2={B.y}/>})}</svg>
          {visible.map(([key,node],i)=><button key={key} aria-pressed={selected===key} onClick={()=>setSelected(key)} className={`node ${node.group} ${selected===key?"selected":""}`} style={{left:`${node.x}%`,top:`${node.y}%`}}><small>{String(i+1).padStart(2,"0")}</small>{node.label}</button>)}
          <div className="mapCaption">Quan hệ thể hiện cơ chế cho phép / chuyển đổi — không phải tương quan thống kê.</div>
        </div>
        <aside className="detail" aria-live="polite"><div className={`tag ${current.group}`}>{current.group==="base"?"NĂNG LỰC NỀN":current.group==="bridge"?"CƠ CHẾ CẦU NỐI":"KẾT QUẢ TÍCH LŨY"}</div><h2>{current.title}</h2><p className="thesis">{current.thesis}</p><section><span>BẰNG CHỨNG / SUY LUẬN</span><p>{current.evidence}</p></section><section><span>VIỆC PHẢI LÀM</span><p>{current.action}</p></section>{current.source&&<a href={current.source} target="_blank" rel="noreferrer">Mở nguồn ↗</a>}<div className="related"><span>LIÊN KẾT TRỰC TIẾP</span>{links.filter(([a,b])=>a===selected||b===selected).slice(0,4).map(([a,b,label])=><button key={`${a}${b}`} onClick={()=>setSelected(a===selected?b:a)}><i/>{nodeData[a===selected?b:a].label}<small>{label}</small></button>)}</div></aside>
      </div>}
      {view==="roadmap"&&<div className="roadmap"><div className="roadIntro"><span>NGUYÊN TẮC</span><h2>Xây nền trước.<br/>Nâng cấp sau.<br/>Sở hữu cuối cùng.</h2><p>Nếu đảo thứ tự, Việt Nam có thể mua công nghệ và tăng công suất nhưng không tích lũy khả năng tự thiết kế, vận hành và cải tiến.</p></div><div className="stages">{roadmap.map((s,i)=><article key={s.period}><div className="stageHead"><b>0{i+1}</b><span>{s.period}</span></div><h3>{s.label}</h3>{s.items.map(item=><p key={item}><i/>{item}</p>)}</article>)}</div></div>}
      {view==="signals"&&<div className="signals"><div className="signalIntro"><span>TRÁNH CHỈ SỐ ẢO</span><h2>GDP là kết quả.<br/>Đây là tín hiệu dẫn đường.</h2><p>Sáu chỉ số này xuất hiện sớm hơn GDP và cho biết nền kinh tế đang nâng cấp thật hay chỉ mở rộng quy mô.</p></div><div className="signalGrid">{signals.map((s,i)=><article key={s.name}><b>{String(i+1).padStart(2,"0")}</b><em>{s.direction}</em><h3>{s.name}</h3><p>{s.why}</p></article>)}</div><div className="caveat"><b>GIỚI HẠN</b><p>Chưa thể kết luận chính xác giá trị nội địa theo ngành từ số liệu xuất khẩu gộp. Cần TiVA, bảng input–output, dữ liệu hải quan–doanh nghiệp và khảo sát nhà cung ứng.</p></div></div>}
    </section>
  </main>;
}
