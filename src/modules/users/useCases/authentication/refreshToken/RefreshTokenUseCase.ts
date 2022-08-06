import { verify, sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import auth from "@config/auth";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";
import { IUsersTokensRepository } from "@modules/users/repositories/IUserTokensRepository";

interface IPayload {
    sub: string;
    telephone: string;
}

interface IResponse {
    refresh_token: string;
    token: string;
    permissions: string[];
    roles: string[];
}

@injectable()
class RefreshTokenUseCase {
    constructor(
        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository,

        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider
    ) {}

    async execute(token: string): Promise<IResponse> {
        const { sub, telephone } = verify(
            token,
            auth.secret_refresh_token
        ) as IPayload;

        const user_id = sub;

        const userToken =
            await this.usersTokensRepository.findByUserIdAndRefreshToken(
                user_id,
                token
            );

        if (!userToken) {
            throw new AppError("Refresh Token does not exists!");
        }

        await this.usersTokensRepository.deleteById(userToken.id);

        const refresh_token = sign({ telephone }, auth.secret_refresh_token, {
            subject: sub,
            expiresIn: auth.expires_in_refresh_token,
        });

        const expires_date = this.dateProvider.addDays(
            auth.expires_refresh_token_days
        );

        await this.usersTokensRepository.create({
            expires_date,
            refresh_token,
            user_id,
        });

        const newToken = sign({}, auth.secret_token, {
            subject: user_id,
            expiresIn: auth.expires_in_token,
        });

        return {
            refresh_token,
            token: newToken,
            permissions: ["users.list", "users.create", "metrics.list"],
            roles: ["administrator"],
        };
    }
}

export { RefreshTokenUseCase };
