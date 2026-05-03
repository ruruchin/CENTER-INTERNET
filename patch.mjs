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
          <div className="about-reveal w-full">EVERY YEAR, PANTONE AND OTHER</div>
          <div className="about-reveal w-full">TRENDSETTERS <span className="text-[0.6em] align-middle px-1 md:px-2">●</span> APPOINT A</div>
          <div className="about-reveal w-full">PARTICULAR SWATCH <span className="text-[0.6em] align-middle px-1 md:px-2">●</span></div>
          <div className="about-reveal w-full md:pl-[30%] flex flex-col mt-2 md:mt-4">
            <span>FROM THEIR NEVERENDING LIBRARY OF</span>
            <span>HUES AS "COLOR OF THE YEAR."</span>
          </div>
        </div>
        
        {/* Paragraph below the statement aligned correctly to the 30% grid line */}
        <div className="w-full md:pl-[30%] mt-12 md:mt-16 text-left shrink-0">
          <p className="about-reveal text-[10px] md:text-[13px] font-bold uppercase leading-[1.6] opacity-90 text-white max-w-4xl tracking-wide text-justify">
            AND EVERY YEAR, THE ATTEMPT TO ASSIGN A SINGULAR COLOR TO 365 DAYS FULL OF THE UNPREDICTABLE — FROM HASHTAGGED HOT TOPICS TO THE AMERICAN POLITICAL CIRCUS, VERMILLION WILDFIRES TO A DEATH-TOLL HEAVY PANDEMIC — APPEARS AN ALMOST LAUGHABLE GOAL.
          </p>
        </div>
      </div>

      {/* Two Column details (Colors / Effort to acknowledge) */}
      <div className="w-full flex mb-24 md:mb-32 flex-col gap-8 md:gap-12">
        <div className="w-full flex flex-col md:flex-row">
          <div className="w-full md:w-[30%] shrink-0 mb-4 md:mb-0">
            <div className="about-reveal text-[8px] md:text-[10px] font-bold tracking-widest leading-[2] uppercase">
              COLORS
            </div>
          </div>
          <div className="w-full md:w-[70%]">
            <p className="about-reveal text-[10px] md:text-[12px] font-medium leading-[1.8] opacity-80 text-justify max-w-3xl normal-case">
              Unlike colors, which are fixed and full of associations, concepts are an intangible meditation on a particular moment, image, or feeling. They are a love letter to imagination, and a cheerleader for creativity — freewheeling and ever-changing.
            </p>
          </div>
        </div>

        <div className="w-full flex flex-col md:flex-row">
          <div className="w-full md:w-[30%] shrink-0 mb-4 md:mb-0">
            <div className="about-reveal text-[8px] md:text-[10px] font-bold tracking-widest leading-[2] uppercase">
              EFFORT TO<br/>ACKNOWLEDGE
            </div>
          </div>
          <div className="w-full md:w-[70%]">
            <p className="about-reveal text-[10px] md:text-[12px] font-medium leading-[1.8] opacity-80 text-justify max-w-4xl normal-case">
              In an effort to acknowledge the intrinsic beauty of a year spent on this planet, this project rejects the idea that a single color can define a global community, and reduce said community into a single consciousness. Declaring a 'concept of the year' feels more honest, and allows for the dynamism of different perspectives and artistic mediums to shine. If there is any trend to predict, it's this one: anything too perfect, too neat and too tidy, is probably not risking enough.
            </p>
          </div>
        </div>
      </div>

      {/* WHY FUEL ON WATER? */}
      <div className="flex flex-col md:flex-row items-start w-full">
        <div className="w-full md:w-[30%] mb-10 md:mb-0 shrink-0">
           <h3 className="about-reveal text-[8vw] md:text-[3.5vw] font-medium leading-[1] tracking-tighter uppercase whitespace-nowrap">
             WHY FUEL<br/>ON WATER?
           </h3>
        </div>
        <div className="w-full md:w-[70%] flex flex-col gap-10 md:gap-14 max-w-[90%] md:max-w-none pr-0 xl:pr-[15%]">
           <p className="about-reveal text-[4vw] md:text-[1.8vw] font-medium leading-[1.3] uppercase break-words text-justify">
             "FUEL ON WATER" IS A SUGGESTION THAT BEAUTY LIVES IN THE OVERLAP AND IN THE EXPLORATION OF HOW SEEMINGLY DISTINCT IDEAS AND MEDIUMS CAN SHARE SPACE. FUEL IS HARSH, CLOUDY, TOXIC, UNTIL IT SPILLS INTO WATER, WHICH IS PURIFYING, CLEAR, ESSENTIAL.THE RAINBOW OF COLORS THAT REVEALS ITSELF AS A RESULT OF THIS MIX PROVES THAT RADICALLY DIFFERENT PERSPECTIVES CAN EXIST IN HARMONY.<br/>
             <br/>
             2020, IN PARTICULAR, HAS BEEN A YEAR OF DARK DAYS ILLUMINATED BY SILVER LININGS.
           </p>

           <div className="flex flex-col md:flex-row gap-6 md:gap-8 text-[9px] md:text-[11px] font-medium leading-[1.8] opacity-80 text-justify pr-0 xl:pr-[5%] normal-case mt-4">
             <div className="about-reveal flex-1">
               The fragility of a material that changes colors — like a beetle's shell, or an opal stone — lies in the fact that it can become something that looks unique depending on the angle it is being viewed from.
             </div>
             <div className="about-reveal flex-1">
               Surprising, ethereal, and mercurial, too, this spectrum of iridescence holds endless possibility, a quiet promise of something greater beyond what the eye can see. When a shimmering soap bubble is formed from liquid meeting gas, it becomes a weightless, dynamic structure.
             </div>
             <div className="about-reveal flex-1">
               At once, two opposite elements collapse into one: an organic demonstration of the ways we can create matter that invites a whole range of images and emotions to coexist. Beyond the bubble's form, its iridescence is the transformation of a structural color
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
console.log('Successfully patched AboutSection');
