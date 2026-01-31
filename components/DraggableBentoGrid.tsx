'use client';

import React, { useState, useEffect } from 'react';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragOverlay,
    defaultDropAnimationSideEffects,
    DragStartEvent,
    DragEndEvent,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    rectSortingStrategy,
    useSortable,
    defaultAnimateLayoutChanges,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { BentoCard, BentoGrid } from './BentoGrid';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// --- Sortable Item Wrapper ---
interface SortableItemProps {
    id: string;
    children: React.ReactNode;
    className?: string;
}

function SortableItem({ id, children, className }: SortableItemProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id,
        animateLayoutChanges: (args) => {
            const { isSorting, wasDragging } = args;
            if (isSorting || wasDragging) {
                return defaultAnimateLayoutChanges(args);
            }
            return true;
        }
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 50 : 1,
        opacity: isDragging ? 0.5 : 1, // Keep opacity change
    };

    // Safely clone to pass disableAnimation
    const contentWithProps = React.isValidElement(children)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ? React.cloneElement(children as React.ReactElement<any>, { disableAnimation: true } as any)
        : children;

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className={cn("h-full w-full", className)}
        >
            {contentWithProps}
        </div>
    );
}

// --- Logic Wrapper ---
interface DraggableBentoGridProps {
    items: {
        id: string;
        className?: string;
        content: React.ReactNode;
    }[];
    onOrderChange?: (newOrder: string[]) => void;
}

export function DraggableBentoGrid({ items: initialItems, onOrderChange }: DraggableBentoGridProps) {
    const [items, setItems] = useState(initialItems);
    const [activeId, setActiveId] = useState<string | null>(null);

    // Sensors for mouse and keyboard
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8, // Require 8px movement before drag starts (prevents accidental clicks)
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    // Sync state with props
    useEffect(() => {
        setItems(initialItems);
    }, [initialItems]);

    // Handle reorder
    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            const oldIndex = items.findIndex((item) => item.id === active.id);
            const newIndex = items.findIndex((item) => item.id === over.id);

            const newItems = arrayMove(items, oldIndex, newIndex);

            setItems(newItems);

            // Persist / Callback
            if (onOrderChange) {
                onOrderChange(newItems.map(i => i.id));
            }
        }
        setActiveId(null);
    }

    function handleDragStart(event: DragStartEvent) {
        setActiveId(event.active.id as string);
    }

    const dropAnimation = {
        sideEffects: defaultDropAnimationSideEffects({
            styles: {
                active: {
                    opacity: '0.5',
                },
            },
        }),
    };

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            <BentoGrid className="relative">
                <SortableContext items={items.map(i => i.id)} strategy={rectSortingStrategy}>
                    {items.map((item) => (
                        <SortableItem key={item.id} id={item.id} className={item.className}>
                            {/* Pass disableAnimation to children inside SortableContext */}
                            {React.isValidElement(item.content)
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                ? React.cloneElement(item.content as React.ReactElement<any>, { disableAnimation: true } as any)
                                : item.content}
                        </SortableItem>
                    ))}
                </SortableContext>

                {/* Overlay for the item being dragged (visual feedback) */}
                <DragOverlay dropAnimation={dropAnimation}>
                    {activeId ? (
                        <div className="h-full w-full opacity-90 scale-105 cursor-grabbing shadow-2xl rounded-3xl">
                            {/* Clone the content for the overlay */}
                            {(() => {
                                const activeItem = items.find(i => i.id === activeId);
                                return activeItem && React.isValidElement(activeItem.content)
                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                    ? React.cloneElement(activeItem.content as React.ReactElement<any>, { disableAnimation: true } as any)
                                    : activeItem?.content
                            })()}
                        </div>
                    ) : null}
                </DragOverlay>
            </BentoGrid>
        </DndContext>
    );
}
