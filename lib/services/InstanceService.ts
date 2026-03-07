import crypto from "node:crypto";
import {
    deleteAllInstances,
    insertInstance,
    findInstance,
    findInstanceBySecretHash,
    updateInstanceDetails,
    deleteInstance,
} from "../repositories/instanceRepository";
import {
    fetchJobIds,
    deleteAllJobsForInstance,
} from "../repositories/jobRepository";
import {
    fetchConnectionIds,
    deleteAllConnectionsForInstance,
} from "../repositories/connectionRepository";
import { deleteUpdatesForParents } from "../repositories/updateRepository";
import { Instance } from "../types";

export function hashSecret(secret: string): string {
    return crypto.createHash("sha256").update(secret).digest("hex");
}

export async function createOrReplaceInstance(params: {
    name: string;
    email: string;
    secret: string;
}): Promise<Instance> {
    const secretHash = hashSecret(params.secret);
    await deleteAllInstances();
    return insertInstance({
        name: params.name,
        email: params.email,
        secretHash,
    });
}

export async function getInstance(): Promise<Instance | null> {
    return findInstance();
}

export async function validateInstanceSecret(
    secret: string,
): Promise<Instance | null> {
    const secretHash = hashSecret(secret);
    return findInstanceBySecretHash(secretHash);
}

export async function updateInstance(params: {
    name: string;
    email: string;
}): Promise<Instance | null> {
    return updateInstanceDetails(params);
}

export async function deleteInstanceCompletely(): Promise<void> {
    const jobIds = await fetchJobIds();
    const connectionIds = await fetchConnectionIds();
    const parentIds = [...jobIds, ...connectionIds];

    if (parentIds.length > 0) {
        await deleteUpdatesForParents(parentIds);
    }

    await deleteAllJobsForInstance();
    await deleteAllConnectionsForInstance();
    await deleteInstance();
}
