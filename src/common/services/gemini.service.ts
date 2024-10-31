import { GenerativeModel, GoogleGenerativeAI } from '@google/generative-ai';
import { BadRequestException, Injectable } from '@nestjs/common';
import { schema } from 'src/common/models/history.model';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GeminiService {
  private genAI: GoogleGenerativeAI;
  private model: GenerativeModel;

  constructor(private readonly configService: ConfigService) {
    this.genAI = new GoogleGenerativeAI(configService.get('API_KEY_GEMINI'));

    this.model = this.genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      generationConfig: {
        responseMimeType: 'application/json',
        responseSchema: schema,
      },
      systemInstruction: 'You are a narrator of horror stories in Spanish.',
    });
  }

  public async generateText(prompt: string): Promise<History> {
    try {
      const { response } = await this.model.generateContent(prompt);
      return JSON.parse(response.text());
    } catch (err: unknown) {
      throw new BadRequestException('Error generating history: ' + err);
    }
  }
}
