import fs from 'fs';

const filePath = 'c:/Users/User/Downloads/Diplome/src/pages/Home.jsx';
let content = fs.readFileSync(filePath, 'utf8');

const startMarker = 'function AboutSection() {';
const endMarker = '/* =========================================\n   3. VIDEO REVEAL SECTION';

const startIndex = content.indexOf(startMarker);
const endIndex = content.indexOf(endMarker);

if (startIndex === -1 || endIndex === -1) {
    console.error('Markers not found');
    process.exit(1);
}

const newAboutSection = `function AboutSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".about-reveal", 
        { y: 50, opacity: 0 },
        { 
          y: 0, opacity: 1, 
          duration: 1.5, 
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-[#0a0a0a] text-white px-4 md:px-12 py-24 md:py-32 flex flex-col font-sans uppercase z-10 relative selection:bg-white selection:text-black">
      
      {/* Massive Statement with staggered indentation */}
      <div className="w-full mb-20 md:mb-28 mt-12 md:mt-24">
        {/* We use explicit div lines to match the hard-coded line breaks in the reference */}
        <div className="flex flex-col w-full text-[6.5vw] md:text-[5vw] font-medium leading-[1.1] tracking-tighter uppercase whitespace-normal break-words">
          <div className="about-reveal w-full">КАЖДЫЙ ГОД СТАРТАПЫ И</div>
          <div className="about-reveal w-full">КРУПНЫЕ ИГРОКИ <span className="text-[0.6em] align-middle px-1 md:px-2">●</span> ВЫВОДЯТ</div>
          <div className="about-reveal w-full">НОВЫЕ ПРИЛОЖЕНИЯ <span className="text-[0.6em] align-middle px-1 md:px-2">●</span></div>
          <div className="about-reveal w-full md:pl-[30%] flex flex-col mt-2 md:mt-4">
            <span>ИЗ СВОЕЙ БЕСКОНЕЧНОЙ БИБЛИОТЕКИ</span>
            <span>ИДЕЙ РАДИ СТАТУСА «ПРОДУКТ ГОДА».</span>
          </div>
        </div>
        
        {/* Paragraph below the statement aligned correctly to the 30% grid line */}
        <div className="w-full md:pl-[30%] mt-12 md:mt-16 text-left shrink-0">
          <p className="about-reveal text-[10px] md:text-[13px] font-bold uppercase leading-[1.6] opacity-90 text-white max-w-4xl tracking-wide text-justify">
            И КАЖДЫЙ ГОД ПОПЫТКА УМЕСТИТЬ ВСЕ ФУНКЦИИ В ОДИН ИДЕАЛЬНЫЙ СЕРВИС ДЛЯ 365 ДНЕЙ НЕПРЕДСКАЗУЕМОСТИ — ОТ АЛГОРИТМОВ СОЦСЕТЕЙ ДО ИЗМЕНЕНИЙ В ПОВЕДЕНИИ ПОЛЬЗОВАТЕЛЕЙ — КАЖЕТСЯ ПОЧТИ НЕДОСТИЖИМОЙ БИЗНЕС-ЦЕЛЬЮ.
          </p>
        </div>
      </div>

      {/* Two Column details (Colors / Effort to acknowledge) */}
      <div className="w-full flex mb-24 md:mb-32 flex-col gap-8 md:gap-12">
        <div className="w-full flex flex-col md:flex-row">
          <div className="w-full md:w-[30%] shrink-0 mb-4 md:mb-0">
            <div className="about-reveal text-[8px] md:text-[10px] font-bold tracking-widest leading-[2] uppercase">
              ПОДХОД
            </div>
          </div>
          <div className="w-full md:w-[70%]">
            <p className="about-reveal text-[10px] md:text-[12px] font-medium leading-[1.8] opacity-80 text-justify max-w-3xl normal-case">
              В отличие от продуктов, которые статичны и переполнены устаревшими ассоциациями, наша работа — это неосязаемая медитация над конкретной задачей или пользовательским опытом. Они — любовное письмо инновациям и проводник для функциональности — бесконечно свободно растущей и эволюционирующей.
            </p>
          </div>
        </div>

        <div className="w-full flex flex-col md:flex-row">
          <div className="w-full md:w-[30%] shrink-0 mb-4 md:mb-0">
            <div className="about-reveal text-[8px] md:text-[10px] font-bold tracking-widest leading-[2] uppercase">
              СТРЕМЛЕНИЕ<br/>К ПРИЗНАНИЮ
            </div>
          </div>
          <div className="w-full md:w-[70%]">
            <p className="about-reveal text-[10px] md:text-[12px] font-medium leading-[1.8] opacity-80 text-justify max-w-4xl normal-case">
              В попытке осознать истинную ценность цифрового решения, данный подход отвергает идею о том, что одна функциональность может определить глобальное сообщество и ужать сложное общество в единый интерфейс. Признание "концепции года" ощущается более честным и позволяет сиять динамизму различных перспектив и технических средств. Если и нужно что-то предсказывать, то лишь одно: всё, что слишком идеально, слишком гладко и упорядочено — вероятно, не рискует в должной мере.
            </p>
          </div>
        </div>
      </div>

      {/* WHY FUEL ON WATER? */}
      <div className="flex flex-col md:flex-row items-start w-full">
        <div className="w-full md:w-[30%] mb-10 md:mb-0 shrink-0">
           <h3 className="about-reveal text-[8vw] md:text-[3.5vw] font-medium leading-[1] tracking-tighter uppercase whitespace-nowrap">
             ПОЧЕМУ<br/>ИСКУССТВО<br/>СОЗДАНИЯ?
           </h3>
        </div>
        <div className="w-full md:w-[70%] flex flex-col gap-10 md:gap-14 max-w-[90%] md:max-w-none pr-0 xl:pr-[15%]">
           <p className="about-reveal text-[4vw] md:text-[1.8vw] font-medium leading-[1.3] uppercase break-words text-justify">
             "ИСКУССТВО СОЗДАНИЯ ПРОДУКТОВ" — ЭТО УТВЕРЖДЕНИЕ О ТОМ, ЧТО КРАСОТА ЖИВЕТ В ПЕРЕСЕЧЕНИИ И ИССЛЕДОВАНИИ ТОГО, КАК, КАЗАЛОСЬ БЫ, РАЗНЫЕ БИЗНЕС-ИДЕИ МОГУТ РАЗДЕЛЯТЬ ОДНО ПРОСТРАНСТВО. ИДЕЯ МОЖЕТ БЫТЬ СУРОВОЙ ИЛИ ЗАПУТАННОЙ, ПОКА ОН НЕ ПОГРУЖАЕТСЯ В СРЕДУ РАЗРАБОТКИ, КОТОРАЯ ЕЕ ОЧИЩАЕТ. ФИНАЛЬНЫЙ РЕЗУЛЬТАТ ДОКАЗЫВАЕТ, ЧТО РАДИКАЛЬНО РАЗЛИЧНЫЕ ВИДЕНИЯ МОГУТ СУЩЕСТВОВАТЬ В ПОЛНОЙ ГАРМОНИИ.<br/>
             <br/>
             НАЧАЛО ЭТОГО ГОДА, В ЧАСТНОСТИ, СТАЛО ВРЕМЕНЕМ ТЕМНЫХ ДНЕЙ, ОСВЕЩЕННЫХ ЦИФРОВЫМИ НАДЕЖДАМИ.
           </p>

           <div className="flex flex-col md:flex-row gap-6 md:gap-8 text-[9px] md:text-[11px] font-medium leading-[1.8] opacity-80 text-justify pr-0 xl:pr-[5%] normal-case mt-4">
             <div className="about-reveal flex-1">
               Успех продукта, который меняется — как живая экосистема — заключается в том, что он может становиться чем-то абсолютно уникальным в зависимости от пользователя, который им управляет на экране.
             </div>
             <div className="about-reveal flex-1">
               Удивительный, эфирный и переменчивый, как само время, этот спектр изменчивости несет в себе бесконечные возможности бизнеса, надежду на что-то большее за пределами того, что может увидеть обычный глаз.
             </div>
             <div className="about-reveal flex-1">
               И когда два противоположных элемента сливаются воедино: это органичная демонстрация того, как мы можем создавать материю, рождающую целый диапазон эмоций. За пределами формы кроется трансформация.
             </div>
           </div>
        </div>
      </div>

    </section>
  );
}

`;

const newContent = content.slice(0, startIndex) + newAboutSection + content.slice(endIndex);
fs.writeFileSync(filePath, newContent, 'utf8');
console.log('Successfully patched AboutSection with Russian text');
