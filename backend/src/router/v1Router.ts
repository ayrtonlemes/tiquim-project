//v1Router.ts
import { Router } from "express";
import languageRouter from "../resources/language/language.router";
import userRouter from "../resources/user/user.router";
import authRouter from "../resources/auth/auth.router";
import campaignRouter from "../resources/campaign/campaign.router"
import paymentMethodRouter from "../resources/paymentMethod/paymentMethod.router"
import contributionRouter from "../resources/contribution/contribution.router"
import rewardRouter from "../resources/reward/reward.router"
import commentRouter from "../resources/comment/comment.router"
import reportCommentRouter from "../resources/reportComment/reportComment.router"
import reportCampaignRouter from "../resources/reportCampaign/reportCampaign.router"
import postRouter from "../resources/post/post.router"
import addressRouter from "../resources/address/address.router"
import creditCardRouter from "../resources/creditCard/creditCard.router"
const router = Router();

router.use("/language",
languageRouter);

router.use("/user", // #swagger.tags = ['User']
userRouter);

router.use("/auth", // #swagger.tags = ['Auth']
authRouter);

router.use("/campaign", // #swagger.tags = ['Campaign']
campaignRouter);

router.use("/paymentMethod", // #swagger.tags = ['PaymentMethod']
paymentMethodRouter);

router.use("/contribution", // #swagger.tags = ['Contributions']
contributionRouter);

router.use("/reward", // #swagger.tags = ['Reward']
rewardRouter);

router.use("/comment", // #swagger.tags = ['Comment']
commentRouter);

router.use("/reportComment", // #swagger.tags = ['ReportCampaign']
reportCommentRouter);

router.use("/reportCampaign", // #swagger.tags = ['ReportCampaign']
reportCampaignRouter);

router.use("/post", // #swagger.tags = ['Post']
postRouter);

    
router.use("/address", // #swagger.tage = ['Address']
addressRouter);

router.use("/creditCard", // #swagger.tage = ['CreditCard']
creditCardRouter);

export default router;