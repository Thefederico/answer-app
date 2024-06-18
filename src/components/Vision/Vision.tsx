/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { toast } from "sonner";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

interface VisionState {
  image: {
    url: string;
    file: File | null;
  };
  prompt: string;
  message: string;
  loading: boolean;
}

export interface Message {
  role: string;
  content: string;
}

export default function Vision() {
  const [state, setState] = useState<VisionState>({
    image: {
      url: "",
      file: null,
    },
    prompt: "",
    message: "",
    loading: false,
  });

  const tooggleLoading = (loading: boolean) => {
    setState((prev) => ({ ...prev, loading }));
  };

  const downloadExampleImage = () => {
    const imagePath = "/example.jpg";
    const link = document.createElement("a");
    link.href = imagePath;
    link.download = "example_image.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (state.image.file === null || state.prompt === "") {
      return;
    }

    // max imum file size is < 1 MB
    if (state.image.file.size > 1000000) {
      toast(
        "La imagen es muy grande, por favor sube una imagen de menos de 1 MB"
      );

      return;
    }

    tooggleLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", state.image.file);
      formData.append("prompt", state.prompt);
      const response = fetch("/api/vision", {
        method: "POST",
        body: formData,
      });
      const data = await response.then((res) => res.json());
      setState((prev) => ({ ...prev, message: data["content"] }));
      tooggleLoading(false);
    } catch (error) {
      toast("Hubo un error al procesar la imagen");
      tooggleLoading(false);
    }
  };

  const renderedImage = () => {
    const {
      image: { file, url },
    } = state;

    if (!file && !url) return null;

    return (
      <div className="rounded-sm">
        <img src={url} alt="Image" className="w-full h-auto object-cover" />
      </div>
    );
  };

  const renderPrompt = () => {
    const {
      image: { file, url },
    } = state;

    if (!file && !url) return null;

    return (
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <Input
          id="prompt"
          name="prompt"
          placeholder="Pregunta"
          type="text"
          onChange={handleChange}
        />
        <div className="items-center gap-1.5 grid w-full max-w-sm">
          {state.image.file && state.image.file && state.prompt && (
            <Button type="submit">Analizar imagen</Button>
          )}
        </div>
      </form>
    );
  };

  return (
    <div>
      <Card className="flex flex-col items-center mx-auto max-w-96 lg:max-w-[720px]">
        <CardHeader>
          <CardTitle>Vision</CardTitle>
          <CardDescription>
            Gracias a la visión de la inteligencia artificial, podemos analizar
            una imagen tomada por el usuario (screen-shot o foto). Ayudamos al
            usuario a tomar una decisión.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-2">
            <div className="items-center gap-1.5 grid w-full max-w-sm">
              <Label htmlFor="picture">Imagen</Label>
              <Input
                name="picture"
                id="picture"
                type="file"
                accept=".jpeg,.jpg"
                onChange={(e) => {
                  if (!e.target.files || e.target.files.length === 0) return;
                  setState({
                    ...state,
                    image: {
                      url: URL.createObjectURL(e.target.files[0]),
                      file: e.target.files[0],
                    },
                  });
                }}
              />
            </div>
            <div>
              <Button
                className="items-center gap-1.5 grid w-full max-w-sm"
                onClick={downloadExampleImage}
              >
                Descargar ejemplo
              </Button>
            </div>
            <figure>{renderedImage()}</figure>
            <div>{renderPrompt()}</div>
          </div>
        </CardContent>
        <CardFooter>
          {state.loading && (
            <Skeleton className="bg-slate-500 rounded-full w-[220px] h-[20px]" />
          )}
          {state.message && <p>{state.message}</p>}
        </CardFooter>
      </Card>
    </div>
  );
}
