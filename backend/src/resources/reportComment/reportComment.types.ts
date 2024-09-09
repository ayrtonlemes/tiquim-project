import { reportComment } from "@prisma/client";

export type CreateReportCommentDto = Pick<reportComment, "commentId">;

export type reportCommentDto = reportComment;
