import { Component, JSX } from "solid-js";
import { A } from "@solidjs/router";
import { ArrowLeft } from "lucide-solid";
import { Show } from "solid-js";

interface HeaderProps {
    title?: string;
    actions?: JSX.Element;
    showBack?: boolean;
}

export default function Header(props: HeaderProps) {
    return (
        <header class="bg-base-200 border-b border-base-300 p-4 shadow-md flex justify-between items-center z-20 sticky top-0">
            <div class="flex items-center gap-3">
                <Show when={props.showBack} fallback={<img src="/logo.png" alt="logo.png" class="size-8"></img>}>
                    <A href="/" class="btn btn-ghost btn-circle btn-sm ">
                        <ArrowLeft class="w-5 h-5" />
                    </A>
                </Show>
                <h1 class="text-xl font-bold -content tracking-tight">
                    {props.title || "Custom Formula Calculator"}
                </h1>
            </div>
            <div id="header-actions" class="flex gap-2">
                {props.actions}
            </div>
        </header>
    );
};


