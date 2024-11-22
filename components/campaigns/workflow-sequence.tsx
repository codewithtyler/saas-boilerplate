"use client";

import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, GripVertical } from "lucide-react";
import Link from "next/link";

interface Email {
  id: string;
  subject: string;
  waitDays: number;
}

interface WorkflowSequenceProps {
  campaignId: number;
  emails: Email[];
  onReorder: (emails: Email[]) => void;
}

export function WorkflowSequence({ campaignId, emails, onReorder }: WorkflowSequenceProps) {
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(emails);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    onReorder(items);
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-medium mb-4">Email Sequence</h3>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="emails">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
              {emails.map((email, index) => (
                <Draggable key={email.id} draggableId={email.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className="flex items-center gap-4 p-4 border rounded-lg bg-background"
                    >
                      <div {...provided.dragHandleProps} className="cursor-grab">
                        <GripVertical className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{email.subject}</p>
                        <p className="text-sm text-muted-foreground">
                          {index === 0 ? (
                            "Sent immediately"
                          ) : (
                            `Sent ${email.waitDays} days after previous email`
                          )}
                        </p>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/dashboard/campaigns/${campaignId}/email/${email.id}`}>
                          <Pencil className="h-4 w-4 mr-2" />
                          Edit
                        </Link>
                      </Button>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </Card>
  );
}