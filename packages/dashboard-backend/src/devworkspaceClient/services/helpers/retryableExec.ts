/*
 * Copyright (c) 2018-2021 Red Hat, Inc.
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Contributors:
 *   Red Hat, Inc. - initial API and implementation
 */

import { delay } from '../../../services/helpers';

export async function retryableExec<T>(callback: () => Promise<T>, maxAttempt = 5): Promise<T> {
  let error: unknown;
  for (let attempt = 0; attempt < maxAttempt; attempt++) {
    try {
      return await callback();
    } catch (e) {
      error = e;
      console.error(e);
    }
    await delay(1000);
  }
  return Promise.reject(error);
}