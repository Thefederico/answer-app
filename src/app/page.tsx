import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col justify-between w-full">
      <section className="space-y-6 mx-auto container">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-xl">
              Problematica
            </AccordionTrigger>
            <AccordionContent>
              Desde el avance de la tecnología, gracias a la llegada del
              micro-transistor y la miniaturización, las personas han
              experimentado un incremento en su dependencia del uso de
              dispositivos electrónicos. Esto ha llevado a una parte de la
              población a quedar por detrás del entendimiento y de los grandes
              beneficios que trae el mundo digital a nuestras vidas. Gracias a
              la pandemia por COVID-19, la brecha entre la tecnología y esta
              parte de la población se ha ampliado, y es donde la misma
              tecnología debe ser utilizada para mejorar la educación y la
              promoción de la igualdad en el mundo digital.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-xl">Solución</AccordionTrigger>
            <AccordionContent>
              Eva es una plataforma que aprovecha la tecnología de inteligencia
              artificial para ofrecer un servicio de acompañamiento tecnológico
              a usuarios afectados por el cambio drástico en el mundo digital .
              Esta herramienta busca brindar un apoyo personalizado y adaptable
              a las necesidades de los usuarios, como identificando noticias
              falsas, ayudarles a navegar en internet de manera segura y
              eficiente o proporcionar orientación sobre temas relevantes para
              sus intereses. Eva busca ser un aliado confiable y utilizable por
              aquellos que buscan mejorar su experiencia digital y protegerse de
              las amenazas online.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <div className="flex mt-3 w-full">
          <Button
            variant="outline"
            className="mx-auto w-1/3 text-slate-950 transition-all translate-x-0 hover:-translate-y-1 active:-translate-y-1"
          >
            <Link className="w-full" href="/eva">Demo</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
