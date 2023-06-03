import {
    Accordion,
    AccordionItem,
    AccordionItemButton,
    AccordionItemHeading,
    AccordionItemPanel
} from "react-accessible-accordion"

import "../../styles/accordion-style.css"
import React from "react";

interface Params {
    title: string;
    content: React.ReactNode
}

export default function AccordionComponent(props: Params) {
    const {title, content} = props;
    return (
        <Accordion 
                allowMultipleExpanded={true}
                allowZeroExpanded={true}
            >
                <AccordionItem>
                    <AccordionItemHeading>
                        <AccordionItemButton>
                            <h1>{title}</h1>
                        </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                        <h1>{content}</h1>
                    </AccordionItemPanel>
                </AccordionItem>
            </Accordion>
    )
}